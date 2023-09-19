package com.ssafy.recipe.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeSearchResponse {
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
