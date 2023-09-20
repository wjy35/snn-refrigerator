package com.ssafy.share.db.entity;

import com.ssafy.share.api.request.ShareIngredientRequest;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.AUTO;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ShareIngredient {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "share_ingredient_seq")
    private Long shareIngredientSeq; // pk

    @Column(name = "ingredient_info_id",nullable = false)
    private Short ingredientInfoId; // 식재료ID

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="share_post_id")
    private SharePost sharePost; // 글 번호

    @Column(name = "amount",nullable = false)
    private int amount; // 식재료 양

    @Builder
    public ShareIngredient(SharePost sharePost,Short ingredientInfoId, int amount) {
        this.sharePost=sharePost;
        this.ingredientInfoId = ingredientInfoId;
        this.amount = amount;
    }

    public void update(ShareIngredientRequest request) {
        this.ingredientInfoId = request.getIngredientInfoId();
        this.amount = request.getAmount();
    }
}
