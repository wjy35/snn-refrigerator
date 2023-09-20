package com.ssafy.ingredientextract.ingredient.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class IngredientInfoDto {
    private Short ingredientId;
    private String ingredientName;
}
