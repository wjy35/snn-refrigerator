package com.ssafy.ingredient.db.entity;

import lombok.*;
import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "ingredient_info")
public class IngredientInfoEntity {
    @Id
    @Column(name = "ingredient_info_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Builder
    public IngredientInfoEntity(Short ingredientInfoId, String ingredientInfoName) {
        this.ingredientInfoId = ingredientInfoId;
        this.ingredientInfoName = ingredientInfoName;
    }
}