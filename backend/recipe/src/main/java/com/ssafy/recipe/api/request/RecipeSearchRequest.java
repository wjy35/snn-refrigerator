package com.ssafy.recipe.api.request;

import com.ssafy.recipe.db.entity.IngredientInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class RecipeSearchRequest {
    private long memberId;
    private String keyword;
    private List<IngredientInfo> requiredIngredients;
    private List<IngredientInfo> excludedIngredients;
    private  long missingIngredientCount;
}
