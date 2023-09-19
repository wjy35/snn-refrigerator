package com.ssafy.recipe.api.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class IngredientParam {
    private String name;
    private String amount;
    private LocalDate lastDate;
}
