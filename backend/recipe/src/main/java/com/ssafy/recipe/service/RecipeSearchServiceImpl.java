package com.ssafy.recipe.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.recipe.api.request.RecipeSearchRequest;
import com.ssafy.recipe.api.response.HouseIngredientResponse;
import com.ssafy.recipe.api.response.MemberResponse;
import com.ssafy.recipe.api.response.RecipeSearchResponse;
import com.ssafy.recipe.db.entity.FavoriteRecipe;
import com.ssafy.recipe.db.entity.IngredientInfo;
import com.ssafy.recipe.db.entity.Recipe;
import com.ssafy.recipe.db.entity.RecipeIngredient;
import com.ssafy.recipe.db.repository.FavoriteRecipeRepository;
import com.ssafy.recipe.db.repository.RecipeCustomIngredientRepository;
import com.ssafy.recipe.db.repository.RecipeIngredientRepository;
import com.ssafy.recipe.db.repository.RecipeRepository;
import com.ssafy.recipe.exception.CustomException;
import com.ssafy.recipe.exception.ErrorCode;
import com.ssafy.recipe.service.feign.HouseIngredientFeign;
import com.ssafy.recipe.service.feign.MemberFeign;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.lang.reflect.Member;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeSearchServiceImpl implements RecipeSearchService {

    private final EntityManager entityManager;

    private final MemberFeign memberFeign;

    private final FavoriteRecipeRepository favoriteRecipeRepository;

    private final HouseIngredientFeign houseIngredientFeign;

    private final RecipeIngredientRepository recipeIngredientRepository;

    private final RecipeCustomIngredientRepository recipeCustomIngredientRepository;

    private final ObjectMapper objectMapper;

    @Override
// TODO : 쿼리 검증 및 최적화 방안 모색
    public  List<RecipeSearchResponse> getSearchRecipe(RecipeSearchRequest recipeSearchRequest) {
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
                        " WHERE req2.ingredientInfo.ingredientInfoId IN :excludedIngredients " +
                        " )" +
                        ")" +
                        "AND r.title LIKE :keyword " +
                        "GROUP BY r.recipeId " +
                        "HAVING COUNT(r.recipeId) >= :requiredIngredientsSize", Recipe.class);

        List<Short> requiredIngredientIds = recipeSearchRequest.getRequiredIngredients().stream()
                .map(IngredientInfo::getIngredientInfoId)
                .collect(Collectors.toList());

        List<Short> excludedIngredientIds = recipeSearchRequest.getExcludedIngredients().stream()
                .map(IngredientInfo::getIngredientInfoId)
                .collect(Collectors.toList());

        query.setParameter("requiredIngredients", requiredIngredientIds);
        query.setParameter("excludedIngredients", excludedIngredientIds);
        query.setParameter("keyword", "%" + recipeSearchRequest.getKeyword() + "%");
        query.setParameter("requiredIngredientsSize", (long) requiredIngredientIds.size());


        List<Recipe> recipeList = query.getResultList();

        List<RecipeSearchResponse> result = new ArrayList<>();

        MemberResponse memberResponse = this.getMember(recipeSearchRequest.getMemberId());

        for(int i=0; i<recipeList.size(); i++){
            Recipe recipe = recipeList.get(i);

            String nickname = memberResponse.getNickname();

            int myIngredients = this.getMyIngredientCnt(recipe, memberResponse.getHouseCode());

            int neededIngredients = this.getNeededIngredientsCnt(recipe);

            boolean isFavorite = this.favoriteCheck(recipeSearchRequest.getMemberId(), recipe.getRecipeId());

            RecipeSearchResponse recipeSearchResponse = RecipeSearchResponse.builder()
                    .recipeId(recipe.getRecipeId())
                    .title(recipe.getTitle())
                    .nickname(nickname)
                    .imageUrl(recipe.getImageUrl())
                    .cookingTime(recipe.getCookingTime())
                    .serving(recipe.getServing())
                    .favoriteCount(recipe.getFavoriteCount())
                    .foodName(recipe.getFoodName())
                    .neededIngredients(neededIngredients)
                    .isFavorite(isFavorite)
                    .myIngredients(myIngredients)
                    .build();

            result.add(recipeSearchResponse);
        }
        return result;
    }

    @Override
    public boolean favoriteCheck(long memberId, int recipeId){
        Optional<FavoriteRecipe> favoriteRecipe = favoriteRecipeRepository.findByRecipeRecipeIdAndMemberId(recipeId, memberId);

        if(favoriteRecipe.isEmpty()) return false;

        return true;
    }

    @Override
    public int getNeededIngredientsCnt(Recipe recipe){
        return recipeIngredientRepository.countAllByRecipe(recipe)+recipeCustomIngredientRepository.countAllByRecipe(recipe);
    }

    @Override
    public void getRecipeSearchResponse(long memberId) {

    }

    @Override
    public int getMyIngredientCnt(Recipe recipe, String houseCode){
        List<HouseIngredientResponse> houseIngredientResponses= this.getHouseIngredientResponse(houseCode);

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


    @Override
    public List<HouseIngredientResponse> getHouseIngredientResponse(String houseCode){

        String st = houseIngredientFeign.getHouseIngredient(houseCode);

        JSONObject jsonObject = new JSONObject(st);

        // "request" 객체에서 "houseCode" 값을 추출
        JSONArray ingredientsArray = jsonObject.getJSONObject("data").getJSONArray("ingredients");

        // 결과를 저장할 리스트
        List<HouseIngredientResponse> resultList = new ArrayList<>();

        // "ingredients" 배열을 순회하면서 필요한 데이터를 추출하여 객체로 만들고 리스트에 추가
        for (int i = 0; i < ingredientsArray.length(); i++) {
            JSONObject ingredientObject = ingredientsArray.getJSONObject(i);
            int ingredientInfoId = ingredientObject.getInt("ingredientInfoId");
            String ingredientName = ingredientObject.getString("ingredientName");
            JSONObject ingredient = ingredientsArray.getJSONObject(i);
            String lastDate = ingredient.isNull("lastDate") ? null : ingredient.getString("lastDate");

            HouseIngredientResponse houseIngredientResponse = HouseIngredientResponse.builder()
                    .ingredientInfoId(ingredientInfoId)
                    .ingredientName(ingredientName).build();

            if(lastDate != null) houseIngredientResponse.setLastDate(LocalDate.parse(lastDate));

            resultList.add(houseIngredientResponse);
        }

        return resultList;
    }

    @Override
    public MemberResponse getMember(Long memberId){
        MemberResponse memberResponse = objectMapper.convertValue(memberFeign.getMemberDetail(memberId).getData().get("memberInfo"),MemberResponse.class);

        System.out.println(memberResponse.toString());

        if(memberResponse != null){
            return memberResponse;
        }else{
            throw new CustomException(ErrorCode.NOT_FOUND_MEMBER);
        }
    }
}
