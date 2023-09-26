package com.ssafy.recipe.api.request;

import com.ssafy.recipe.db.entity.RecipeDetail;
import lombok.*;
import org.hibernate.annotations.NaturalId;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class RecipeRequest {
    private String title;
    private Long memberId;
    private String cookingTime;
    private String foodName;
    private String imageUrl;
    private byte serving;
    private String youtubeUrl;
    private List<RecipeDetailParam> contents;
    private List<RecipeIngredientParam> ingredients;
    private MultipartFile recipeImage;
}
