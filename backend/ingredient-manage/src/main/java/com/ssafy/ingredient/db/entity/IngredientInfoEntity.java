package com.ssafy.ingredient.db.entity;

import javax.persistence.*;

@Entity
@Table(name = "ingredient_info")
public class IngredientInfoEntity {
    @Id
    @Column(name = "ingredient_info_id")
    @GeneratedValue
    private Short ingredientInfoId;

    @Column(name = "ingredient_info_name")
    private String ingredientInfoName;

    public Short getIngredientInfoId() {
        return ingredientInfoId;
    }

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
