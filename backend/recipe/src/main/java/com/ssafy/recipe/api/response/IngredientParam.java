package com.ssafy.recipe.api.response;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class IngredientParam {
    private String name;
    private String amount;
    private LocalDate lastDate;
}
