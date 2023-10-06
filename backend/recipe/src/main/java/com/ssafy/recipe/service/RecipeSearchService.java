package com.ssafy.recipe.service;

import com.ssafy.recipe.api.request.RecipeSearchMemberRequest;
import com.ssafy.recipe.api.request.RecipeSearchRequest;
import com.ssafy.recipe.api.response.HouseIngredientResponse;
import com.ssafy.recipe.api.response.MemberResponse;
import com.ssafy.recipe.api.response.RecipeSearchResponse;
import com.ssafy.recipe.api.response.Response;
import com.ssafy.recipe.db.entity.IngredientInfo;
import com.ssafy.recipe.db.entity.Recipe;

import javax.persistence.TypedQuery;
import java.util.List;

public interface RecipeSearchService {

    Response getSearchRecipe(RecipeSearchRequest request);

    Response getMemberRecipe(RecipeSearchMemberRequest recipeSearchMemberRequest);

    void getRecipeSearchResponse(long memberId);
    public int getNeededIngredientsCnt(Recipe recipe);

    public int getMyIngredientCnt(Recipe recipe, String houseCode);

    public MemberResponse getMember(Long memberId);

    boolean favoriteCheck(long memberId, int recipeId);

    List<HouseIngredientResponse> getHouseIngredientResponse(String houseCode);

    TypedQuery<Recipe> getTotalCount(List<Short> requiredIngredientIds, List<Short> excludedIngredientIds, String keyword, long size);
}
