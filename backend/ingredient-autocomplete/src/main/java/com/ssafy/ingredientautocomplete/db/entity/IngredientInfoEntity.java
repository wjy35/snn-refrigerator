package com.ssafy.ingredientautocomplete.db.entity;

import lombok.*;

import javax.persistence.*;


@Entity
@Data
@Table(name = "ingredient_info")
public class IngredientInfoEntity {
    @Id
    @Column(name="ingredient_info_id")
    @GeneratedValue
    private Short ingredientInfoId;

    @Column(name = "ingredient_info_name", nullable = false, length = 32)
    private String ingredientName;
}
