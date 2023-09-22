package com.ssafy.reciperecommend.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_ingredient_seq")
    private int recipeIngredientSeq;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @ManyToOne
    @JoinColumn(name = "ingredient_info_id", nullable = false)
    private IngredientInfo ingredientInfo;

    @Column(name = "amount", length = 10)
    private String amount;

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

}
