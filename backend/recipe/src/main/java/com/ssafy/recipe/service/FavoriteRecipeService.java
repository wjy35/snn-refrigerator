package com.ssafy.recipe.service;


public interface FavoriteRecipeService {

    void addFavoriteRecipe(int recipeId, long memberId);

    void deleteFavoriteRecipe(int recipeId, long memberId);
}
