package com.ssafy.recipe.api.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RecipeDetailRequest {
    private long memberId;
    private int recipeId;
}
