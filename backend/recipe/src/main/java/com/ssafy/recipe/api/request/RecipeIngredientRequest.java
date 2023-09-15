package com.ssafy.recipe.api.request;

import lombok.Getter;

@Getter
public class RecipeIngredientRequest {
    private String ingredientName;
    private String amount;
    private String recipeId;
    private short ingredientInfoId;
}
