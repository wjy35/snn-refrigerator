package com.ssafy.recipe.api.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class RecipeDetailResponse {
    private String nickname;
    private String title;
    private String image;
    private String youtubeUrl;
    private int favoriteCount;
    private int followCount;
    private List<IngredientParam> ingredientResponseList;
    private List<ContentParam> contentResponseList;
}
