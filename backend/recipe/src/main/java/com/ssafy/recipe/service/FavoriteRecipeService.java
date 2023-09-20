package com.ssafy.recipe.service;


import com.ssafy.recipe.db.entity.FavoriteRecipe;

import java.util.List;

public interface FavoriteRecipeService {

    void addFavoriteRecipe(int recipeId, long memberId);

    void deleteFavoriteRecipe(int recipeId, long memberId);

}
