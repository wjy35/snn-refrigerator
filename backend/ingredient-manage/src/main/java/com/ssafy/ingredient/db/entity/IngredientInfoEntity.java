package com.ssafy.ingredient.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class IngredientInfoEntity {
    @Id
    @Column(name = "ingredient_info_id")
    @GeneratedValue
    private Short ingredientInfoId;

    @Column(name = "ingredient_info_name")
    private String ingredientInfoName;

    public String getIngredientInfoName() {
        return ingredientInfoName;
    }

    @Override
    public String toString() {
        return "IngredientInfo{" +
                "ingredientInfoId=" + ingredientInfoId +
                ", ingredientInfoName='" + ingredientInfoName + '\'' +
                '}';
    }
}
