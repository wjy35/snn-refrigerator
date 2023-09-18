package com.ssafy.recipe.db.repository;

import com.ssafy.recipe.db.entity.Recipe;
import com.ssafy.recipe.db.entity.RecipeCustomIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeCustomIngredientRepository extends JpaRepository<RecipeCustomIngredient, Integer> {
   void deleteByRecipe(Recipe recipe);

   List<RecipeCustomIngredient> findAllByRecipe(Recipe recipe);
}
