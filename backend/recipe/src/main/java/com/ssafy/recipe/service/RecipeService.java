package com.ssafy.recipe.service;

import com.ssafy.recipe.api.request.RecipeRequest;

public interface RecipeService {
    void createRecipe(RecipeRequest request);

    void updateRecipe(int recipeId, RecipeRequest request);
}
