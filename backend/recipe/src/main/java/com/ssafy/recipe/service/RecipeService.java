package com.ssafy.recipe.service;

import com.ssafy.recipe.api.request.RecipeDetailRequest;
import com.ssafy.recipe.api.request.RecipeIngredientParam;
import com.ssafy.recipe.api.request.RecipeRequest;
import com.ssafy.recipe.api.response.ContentParam;
import com.ssafy.recipe.api.response.IngredientParam;
import com.ssafy.recipe.api.response.MemberResponse;
import com.ssafy.recipe.api.response.RecipeDetailResponse;
import com.ssafy.recipe.db.entity.Recipe;

import java.util.List;

public interface RecipeService {
    void createRecipe(RecipeRequest request);

    void updateRecipe(int recipeId, RecipeRequest request);

    void deleteRecipe(int recipeId);

    void saveRecipe(Recipe recipe);

    void saveRecipeDetails(Recipe recipe, RecipeRequest request);

    void isCustomIngredient(Recipe recipe, RecipeRequest request);

    void saveRecipeCustomIngredient(Recipe recipe, RecipeIngredientParam recipeIngredientParam);

    void saveRecipeIngredient(Recipe recipe, RecipeIngredientParam recipeIngredientParam);

    RecipeDetailResponse getRecipe(RecipeDetailRequest request);

    List<ContentParam> getRecipeDetail(int recipeId);

    List<IngredientParam> getIngredientList(long memberId, Recipe recipe);

    void updateRecipeIngredient(Recipe recipe, RecipeRequest request);

    void updateRecipeDetails(Recipe recipe, RecipeRequest request);

    void deleteRecipeCustomIngredient(Recipe recipe);

    void deleteRecipeIngredient(Recipe recipe);
}
