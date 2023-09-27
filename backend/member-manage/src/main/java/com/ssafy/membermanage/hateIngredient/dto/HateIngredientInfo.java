package com.ssafy.membermanage.hateIngredient.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HateIngredientInfo {

    private Short ingredientId;

    private String ingredientName;
}
