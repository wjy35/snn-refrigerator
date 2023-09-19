package com.ssafy.recipe.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Builder
@ToString
public class HouseIngredientResponse {

    private int ingredientInfoId; // JSON 데이터와 필드 이름 일치
    private String ingredientName;
}
