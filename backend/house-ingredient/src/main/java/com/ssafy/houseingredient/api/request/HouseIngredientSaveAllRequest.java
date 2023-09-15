package com.ssafy.houseingredient.api.request;

import lombok.Getter;

import java.util.List;

@Getter
public class HouseIngredientSaveAllRequest {
    private Integer houseSeq;
    private List<HouseIngredientDetailParam> ingredients;
}
