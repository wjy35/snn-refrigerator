package com.ssafy.recipe.db.entity;

import javax.persistence.*;

@Entity
public class IngredientInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private short ingredientInfoId;

    @Column(name = "ingredient_name", nullable = false, length = 32)
    private String ingredientName;
}