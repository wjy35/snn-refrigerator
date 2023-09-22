package com.ssafy.reciperecommend.service;

import com.ssafy.reciperecommend.api.response.IngredientResponse;
import com.ssafy.reciperecommend.api.response.MemberResponse;
import com.ssafy.reciperecommend.api.response.RecipeRecommendResponse;
import com.ssafy.reciperecommend.db.entity.Recipe;
import com.ssafy.reciperecommend.db.entity.RecipeIngredient;
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
    @Override
    public List<RecipeRecommendResponse> getRecipeRecommend(long memberId) {
        TypedQuery<Recipe> query = entityManager.createQuery(
                "SELECT DISTINCT r " +
                        "FROM Recipe r " +
                        "JOIN r.recipeIngredients ri " +
                        "WHERE r.recipeId IN (" +
                        " SELECT req.recipe.recipeId " +
                        " FROM RecipeIngredient req " +
                        " WHERE req.ingredientInfo.ingredientInfoId IN :requiredIngredients " +
                        " AND req.recipe.recipeId NOT IN (" +
                        " SELECT req2.recipe.recipeId " +
                        " FROM RecipeIngredient req2 " +
                        " WHERE req2.ingredientInfo.ingredientInfoId IN :hateIngredientIds " +
                        " )" +
                        ")" +
                        "GROUP BY r.recipeId " +
                        "HAVING COUNT(r.recipeId) >= 1", Recipe.class);

        Optional<MemberResponse> memberResponse = memberFeign.getMemberDetail(memberId);

        List<IngredientResponse> houseIngredientResponseList = this.getHouseIngredientResponse(memberResponse.get().getHouseSeq());

        List<IngredientResponse> hateIngredientList = memberFeign.getHateIngredient(memberId);

        List<Short> requiredIngredientIds = houseIngredientResponseList.stream()
                .map(h -> (short) h.getIngredientInfoId()) // int를 Short로 캐스팅
                .collect(Collectors.toList());

        List<Short> hateIngredientIds = hateIngredientList.stream()
                .map(h -> (short) h.getIngredientInfoId()) // int를 Short로 캐스팅
                .collect(Collectors.toList());


        query.setParameter("requiredIngredients", requiredIngredientIds);
        query.setParameter("hateIngredientIds", hateIngredientIds);

        List<Recipe> recipeList = query.getResultList();

        List<RecipeRecommendResponse> result = new ArrayList<>();

        for(int i=0; i<recipeList.size(); i++){
            Recipe recipe = recipeList.get(i);

            String nickname = memberResponse.get().getNickname();

            int myIngredients = this.getMyIngredientCnt(recipe, memberResponse.get().getHouseSeq());

            int neededIngredients = this.getNeededIngredientsCnt(recipe);

            RecipeRecommendResponse recipeSearchResponse = RecipeRecommendResponse.builder()
                    .recipeId(recipe.getRecipeId())
                    .title(recipe.getTitle())
                    .nickname(nickname)
                    .imageUrl(recipe.getImageUrl())
                    .cookingTime(recipe.getCookingTime())
                    .serving(recipe.getServing())
                    .favoriteCount(recipe.getFavoriteCount())
                    .foodName(recipe.getFoodName())
                    .neededIngredients(neededIngredients)
                    .myIngredients(myIngredients)
                    .build();

            result.add(recipeSearchResponse);
        }

        return result;
    }

    public int getNeededIngredientsCnt(Recipe recipe){
        return recipeIngredientRepository.countAllByRecipe(recipe)+recipeCustomIngredientRepository.countAllByRecipe(recipe);
    }

    public int getMyIngredientCnt(Recipe recipe, int houseSeq){
        List<IngredientResponse> houseIngredientResponses= this.getHouseIngredientResponse(houseSeq);

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


    public List<IngredientResponse> getHouseIngredientResponse(int houseSeq){
        String st = houseIngredientFeign.getHouseIngredient(houseSeq);

        System.out.println(st);

        JSONObject jsonObject = new JSONObject(st);

        // "request" 객체에서 "houseSeq" 값을 추출
        JSONArray ingredientsArray = jsonObject.getJSONObject("data").getJSONArray("ingredients");

        // 결과를 저장할 리스트
        List<IngredientResponse> resultList = new ArrayList<>();

        // "ingredients" 배열을 순회하면서 필요한 데이터를 추출하여 객체로 만들고 리스트에 추가
        for (int i = 0; i < ingredientsArray.length(); i++) {
            JSONObject ingredientObject = ingredientsArray.getJSONObject(i);
            int ingredientInfoId = ingredientObject.getInt("ingredientInfoId");
            String ingredientName = ingredientObject.getString("ingredientName");

            IngredientResponse houseIngredientResponse = IngredientResponse.builder()
                    .ingredientInfoId(ingredientInfoId)
                    .ingredientName(ingredientName).build();

            resultList.add(houseIngredientResponse);
        }

        return resultList;
    }

}
