package com.ssafy.recipe.api.request;

import com.ssafy.recipe.db.entity.RecipeDetail;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class RecipeRequest {
    private String title;
    private Long memberId;
    private String cookingTime;
    private String foodName;
    private String imageUrl;
    private byte serving;
    private String youtubeUrl;
    private List<RecipeDetail> content;
    private List<RecipeIngredientRequest> ingredients;
}
