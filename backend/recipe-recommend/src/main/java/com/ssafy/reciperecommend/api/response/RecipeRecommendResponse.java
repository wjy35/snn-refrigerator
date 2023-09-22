package com.ssafy.reciperecommend.api.response;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RecipeRecommendResponse {
    private int recipeId;
    private String nickname;
    private String title;
    private String imageUrl;
    private int favoriteCount;
    private int neededIngredients;
    private int myIngredients;
    private String foodName;
    private String cookingTime;
    private short serving;
}

