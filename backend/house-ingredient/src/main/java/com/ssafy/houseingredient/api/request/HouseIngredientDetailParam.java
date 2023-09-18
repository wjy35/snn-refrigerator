package com.ssafy.houseingredient.api.request;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class HouseIngredientDetailParam {
    private Short ingredientInfoId;
    private String ingredientName;
    private Byte storageType;
    private LocalDate lastDate;
}
