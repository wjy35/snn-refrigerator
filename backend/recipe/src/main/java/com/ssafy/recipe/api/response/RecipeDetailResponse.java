package com.ssafy.recipe.api.response;

import lombok.Getter;

import java.util.List;

@Getter
public class RecipeDetailResponse {
    private String nickname;
    private String title;
    private String image;
    private String youtubeUrl;
    private int favoriteCount;
    private List<IngredientResponse> ingredientResponseList;
    private List<ContentResponse> contentResponseList;
}
