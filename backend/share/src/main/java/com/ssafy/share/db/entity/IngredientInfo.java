package com.ssafy.share.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class IngredientInfo {
    @Id @GeneratedValue(strategy = IDENTITY)
    @Column(name = "location_info_id")
    private Short ingredientInfoId;

    @Column(name = "ingredient_name",length = 15)
    private String ingredientName;


}
