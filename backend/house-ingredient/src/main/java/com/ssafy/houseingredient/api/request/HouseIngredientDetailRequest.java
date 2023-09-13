package com.ssafy.houseingredient.api.request;

import lombok.Getter;

@Getter
public class HouseIngredientDetailRequest {
    private int ingredientInfoId;
    private String ingredientName;
    private byte storageType;
    private String lastDate;
}
