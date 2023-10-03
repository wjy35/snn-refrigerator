package com.ssafy.recipe.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class IngredientParam {
    private String name;
    private String amount;
    private LocalDate lastDate;
    private short IngredientInfoId;
}
