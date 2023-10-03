package com.ssafy.reciperecommend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.reciperecommend.api.response.IngredientResponse;
import com.ssafy.reciperecommend.api.response.MemberResponse;
import com.ssafy.reciperecommend.api.response.RecipeRecommendResponse;
import com.ssafy.reciperecommend.db.entity.FavoriteRecipe;
import com.ssafy.reciperecommend.db.entity.Recipe;
import com.ssafy.reciperecommend.db.entity.RecipeIngredient;
import com.ssafy.reciperecommend.db.repository.FavoriteRecipeRepository;
import com.ssafy.reciperecommend.db.repository.RecipeCustomIngredientRepository;
import com.ssafy.reciperecommend.db.repository.RecipeIngredientRepository;
import com.ssafy.reciperecommend.service.feign.HouseIngredientFeign;
import com.ssafy.reciperecommend.service.feign.MemberFeign;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeRecommendServiceImpl implements RecipeRecommendService{
    private final EntityManager entityManager;

    private final MemberFeign memberFeign;

    private final HouseIngredientFeign houseIngredientFeign;

    private final RecipeIngredientRepository recipeIngredientRepository;

    private final RecipeCustomIngredientRepository recipeCustomIngredientRepository;

    private final ObjectMapper objectMapper;

    private final FavoriteRecipeRepository favoriteRecipeRepository;
    @Override
    public List<RecipeRecommendResponse> getRecipeRecommend(long memberId) {
        TypedQuery<Recipe> query = entityManager.createQuery(
                "SELECT DISTINCT r " +
                        "FROM Recipe r " +
                        "JOIN r.recipeIngredients ri " +
                        "WHERE r.recipeId IN (" +
                        " SELECT req.recipe.recipeId " +
                        " FROM RecipeIngredient req " +
                        " WHERE req.recipe.recipeId NOT IN (" +
                        " SELECT req2.recipe.recipeId " +
                        " FROM RecipeIngredient req2 " +
                        " WHERE req2.ingredientInfo.ingredientInfoId IN :excludedIngredients " +
                        " )" +
                        ")" +
                        "GROUP BY r.recipeId " +
                        "HAVING COUNT(r.recipeId) >= 0", Recipe.class);



        MemberResponse memberResponse = this.getMember(memberId);

        List<IngredientResponse> hateIngredientList = this.getHateIngredient(memberId);


        List<Short> hateIngredientIds = hateIngredientList.stream()
                .map(h -> (short) h.getIngredientInfoId()) // int를 Short로 캐스팅
                .collect(Collectors.toList());


        query.setParameter("excludedIngredients", hateIngredientIds);

        List<Recipe> recipeList = query.getResultList();
        List<RecipeRecommendResponse> result = new ArrayList<>();
        for(int i=0; i<recipeList.size(); i++){
            Recipe recipe = recipeList.get(i);

            MemberResponse memberResponse1 = this.getMember(recipe.getMemberId());
            String nickname = memberResponse.getNickname();
            int myIngredients = this.getMyIngredientCnt(recipe, memberResponse.getHouseCode());
            int neededIngredients = this.getNeededIngredientsCnt(recipe);

            boolean isFavorite = this.favoriteCheck(memberId, recipe.getRecipeId());

            RecipeRecommendResponse recipeSearchResponse = RecipeRecommendResponse.builder()
                    .recipeId(recipe.getRecipeId())
                    .title(recipe.getTitle())
                    .nickname(nickname)
                    .favorite(isFavorite)
                    .imageUrl(recipe.getImageUrl())
                    .profileImageUrl(memberResponse1.getProfileImageUrl())
                    .cookingTime(recipe.getCookingTime())
                    .serving(recipe.getServing())
                    .favoriteCount(recipe.getFavoriteCount())
                    .foodName(recipe.getFoodName())
                    .neededIngredients(neededIngredients)
                    .myIngredients(myIngredients)
                    .build();

            result.add(recipeSearchResponse);
        }

        Collections.shuffle(result);
        result = result.subList(0,7);
        return result;
    }

    public int getNeededIngredientsCnt(Recipe recipe){
        return recipeIngredientRepository.countAllByRecipe(recipe)+recipeCustomIngredientRepository.countAllByRecipe(recipe);
    }

    public int getMyIngredientCnt(Recipe recipe, String houseCode){
        List<IngredientResponse> houseIngredientResponses= this.getHouseIngredientResponse(houseCode);

        List<RecipeIngredient> recipeIngredientList = recipeIngredientRepository.findAllByRecipe(recipe);

        int cnt = 0;
        for(int i=0; i<recipeIngredientList.size(); i++){
            int ingredientInfo = recipeIngredientList.get(i).getIngredientInfo().getIngredientInfoId();

            for(int j=0; j<houseIngredientResponses.size(); j++){
                if(houseIngredientResponses.get(j).getIngredientInfoId() == ingredientInfo) cnt++;
            }
        }
        return cnt;
    }


    public List<IngredientResponse> getHouseIngredientResponse(String houseCode){
        String st = houseIngredientFeign.getHouseIngredient(houseCode);

        JSONObject jsonObject = new JSONObject(st);

        JSONArray ingredientsArray = jsonObject.getJSONObject("data").getJSONArray("ingredients");

        List<IngredientResponse> resultList = new ArrayList<>();

        for (int i = 0; i < ingredientsArray.length(); i++) {
            JSONObject ingredientObject = ingredientsArray.getJSONObject(i);

            int ingredientInfoId = ingredientObject.getInt("ingredientInfoId");

            String ingredientName = ingredientObject.getString("ingredientName");

            IngredientResponse houseIngredientResponse = IngredientResponse.builder()
                    .ingredientInfoId(ingredientInfoId)
                    .ingredientInfoName(ingredientName).build();

            resultList.add(houseIngredientResponse);
        }

        return resultList;
    }

    public MemberResponse getMember(Long memberId){
        MemberResponse memberResponse = objectMapper.convertValue(memberFeign.getMemberDetail(memberId).getData().get("memberInfo"),MemberResponse.class);
        if(memberResponse != null){
            return memberResponse;
        }else{
            throw new RuntimeException();
        }
    }

    public List<IngredientResponse> getHateIngredient(Long memberId){
        String st = memberFeign.getHateIngredient(memberId);

        JSONObject jsonObject = new JSONObject(st);

        JSONArray ingredientsArray = jsonObject.getJSONObject("data").getJSONArray("ingredient");

        List<IngredientResponse> resultList = new ArrayList<>();

        for (int i = 0; i < ingredientsArray.length(); i++) {
            JSONObject ingredientObject = ingredientsArray.getJSONObject(i);

            int ingredientInfoId = ingredientObject.getInt("ingredientInfoId");

            String ingredientName = ingredientObject.getString("ingredientName");

            IngredientResponse houseIngredientResponse = IngredientResponse.builder()
                    .ingredientInfoId(ingredientInfoId)
                    .ingredientInfoName(ingredientName).build();

            resultList.add(houseIngredientResponse);
        }
        return resultList;
    }

    public boolean favoriteCheck(long memberId, int recipeId){
        Optional<FavoriteRecipe> favoriteRecipe = favoriteRecipeRepository.findByRecipeRecipeIdAndMemberId(recipeId, memberId);

        if(favoriteRecipe.isEmpty()) return false;

        return true;
    }

}
