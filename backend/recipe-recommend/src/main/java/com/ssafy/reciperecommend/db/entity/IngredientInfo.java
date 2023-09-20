package com.ssafy.reciperecommend.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IngredientInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private short ingredientInfoId;

    @Column(name = "ingredient_name", nullable = false, length = 32)
    private String ingredientName;
}

