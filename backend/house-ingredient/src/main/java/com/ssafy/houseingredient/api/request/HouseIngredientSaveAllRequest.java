package com.ssafy.houseingredient.api.request;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class HouseIngredientSaveAllRequest {
    private String houseCode;
    private List<HouseIngredientDetailParam> ingredients;
}
