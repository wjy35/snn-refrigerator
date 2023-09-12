package com.ssafy.recipe.db.entity;

import javax.persistence.*;

@Entity
public class RecipeCustomIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_custom_ingredient_seq")
    private int recipeCustomIngredientSeq;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;


    @Column(name = "amount", length = 10)
    private String amount;

    @Column(name = "ingredient_name", length = 15)
    private String ingredientName;

}
