package com.ssafy.recipe.api.request;

import com.ssafy.recipe.db.entity.RecipeDetail;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class RecipeRequest {
    private String title;
    private Long memberId;
    private String cookingTime;
    private String foodName;
    private String imageUrl;
    private byte serving;
    private String youtubeUrl;
    private List<RecipeDetailParam> content;
    private List<RecipeIngredientParam> ingredients;
}
