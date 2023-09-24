package com.ssafy.recipe.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeSearchResponse {
    private int recipeId;
    private String nickname;
    private String title;
    private String imageUrl;
    private String profileImageUrl;
    private int followCount;
    private int favoriteCount;
    private int neededIngredients;
    private int myIngredients;
    private boolean isFavorite;
    private String foodName;
    private String cookingTime;
    private short serving;



}
