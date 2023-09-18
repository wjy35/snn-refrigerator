package com.ssafy.recipe.db.repository;

import com.ssafy.recipe.db.entity.Recipe;
import com.ssafy.recipe.db.entity.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Integer> {
    void deleteByRecipe(Recipe recipe);

    List<RecipeIngredient> findAllByRecipe(Recipe recipe);
}
