package com.ssafy.houseingredient.api.request;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class HouseIngredientSaveRequest {
    private Integer houseIngredientId;
    private Byte storageType;
    private LocalDate lastDate;
}
