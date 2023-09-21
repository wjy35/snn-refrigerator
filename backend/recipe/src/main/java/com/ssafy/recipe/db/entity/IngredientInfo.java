package com.ssafy.recipe.db.entity;

import lombok.*;

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

    @Column(name = "ingredient_info_name", nullable = false, length = 32)
    private String ingredientName;
}
