package com.ssafy.share.api.request;

import com.ssafy.share.db.entity.ShareIngredient;
import com.ssafy.share.db.entity.SharePost;
import lombok.Builder;
import lombok.Data;

@Data
public class ShareIngredientRequest {
    private Short ingredientInfoId;
    private Integer amount;

    public ShareIngredientRequest(Short ingredientInfoId, Integer amount) {
        this.ingredientInfoId = ingredientInfoId;
        this.amount = amount;
    }
}
