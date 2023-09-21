package com.ssafy.share.api.request;

import com.ssafy.share.db.entity.ShareIngredient;
import com.ssafy.share.db.entity.SharePost;
import lombok.Builder;
import lombok.Data;

@Data
public class ShareIngredientRequest {
    private Short ingredientInfoId;
    private Integer amount;
    private SharePost sharePost;

    public ShareIngredientRequest(Short ingredientInfoId, Integer amount) {
        this.ingredientInfoId = ingredientInfoId;
        this.amount = amount;
    }

    public ShareIngredient toEntity() {
        return ShareIngredient.builder().ingredientInfoId(ingredientInfoId).amount(amount).sharePost(sharePost).build();
    }
}
