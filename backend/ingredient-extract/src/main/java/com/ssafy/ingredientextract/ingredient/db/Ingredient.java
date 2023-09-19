package com.ssafy.ingredientextract.ingredient.db;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Ingredient {
    @Id
    @Column(name = "ingredient_info_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Short ingredientInfoId;

    @Column(name = "ingredient_info_name", length = 15)
    private String ingredientInfoName;

}
