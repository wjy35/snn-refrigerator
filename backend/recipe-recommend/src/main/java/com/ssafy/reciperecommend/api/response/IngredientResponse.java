package com.ssafy.reciperecommend.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class IngredientResponse {

    private int ingredientInfoId;
    private String ingredientInfoName;
}
