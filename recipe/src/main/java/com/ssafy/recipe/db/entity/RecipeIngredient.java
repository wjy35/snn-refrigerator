package com.ssafy.recipe.db.entity;

import javax.persistence.*;

@Entity
public class RecipeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_ingredient_seq")
    private int recipeIngredientSeq;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @Column(name = "ingredient_info_id", nullable = false)
    private short ingredientInfoId;

    @Column(name = "amount", length = 10)
    private String amount;

}
