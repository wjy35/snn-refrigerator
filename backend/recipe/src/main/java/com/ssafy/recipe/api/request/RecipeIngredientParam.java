package com.ssafy.recipe.api.request;

import lombok.*;

@Getter
public class RecipeIngredientParam {
    private String ingredientName;
    private String amount;
    private String recipeId;
    private short ingredientInfoId;

    @Builder
    public RecipeIngredientParam(String ingredientName, String amount, short ingredientInfoId) {
        this.ingredientName = ingredientName;
        this.amount = amount;
        this.ingredientInfoId = ingredientInfoId;
    }
}
