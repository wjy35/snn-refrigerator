package com.ssafy.share.api.response;

import lombok.Data;

@Data
public class ShareIngredientResponse {
    private String ingredientName;
    private int remainAmount;

    public ShareIngredientResponse(String ingredientName, int remainAmount) {
        this.ingredientName = ingredientName;
        this.remainAmount = remainAmount;
    }
}
