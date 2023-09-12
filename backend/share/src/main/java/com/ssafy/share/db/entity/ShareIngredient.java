package com.ssafy.share.db.entity;

import lombok.AccessLevel;
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
}
