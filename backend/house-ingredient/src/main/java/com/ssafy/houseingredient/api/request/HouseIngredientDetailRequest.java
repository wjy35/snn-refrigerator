package com.ssafy.houseingredient.api.request;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class HouseIngredientDetailRequest {
    private int ingredientInfoId;
    private String ingredientName;
    private byte storageType;
    private LocalDate lastDate;
}
