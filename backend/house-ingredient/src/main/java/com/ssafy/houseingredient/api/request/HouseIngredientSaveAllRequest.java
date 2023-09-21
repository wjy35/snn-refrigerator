package com.ssafy.houseingredient.api.request;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
public class HouseIngredientSaveAllRequest {
    private String houseCode;
    private List<HouseIngredientDetailParam> ingredients;
}
