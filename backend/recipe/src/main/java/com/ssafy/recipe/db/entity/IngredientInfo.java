package com.ssafy.recipe.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Entity
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
