package com.ssafy.recipe.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@Builder
@ToString
public class RecipeDetailResponse {
    private String nickname;
    private String title;
    private String imageUrl;
    private String youtubeUrl;
    private int favoriteCount;
    private long followCount;
    private String profileImageUrl;
    private boolean isFavorite;
    private short serving;
    private String foodName;
    private String cookingTime;
    private List<IngredientParam> ingredientResponseList;
    private List<ContentParam> contentResponseList;
}
