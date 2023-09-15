package com.ssafy.houseingredient.api.request;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class HouseIngredientDetailParam {
    private Integer ingredientInfoId;
    private String ingredientName;
    private Byte storageType;
    private LocalDate lastDate;
}
