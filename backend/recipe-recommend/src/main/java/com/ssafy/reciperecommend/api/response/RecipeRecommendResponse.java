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
    private String profileImageUrl;
    private int followCount;
    private int favoriteCount;
    private int neededIngredients;
    private int myIngredients;
    private boolean favorite;
    private String foodName;
    private String cookingTime;
    private short serving;
}

