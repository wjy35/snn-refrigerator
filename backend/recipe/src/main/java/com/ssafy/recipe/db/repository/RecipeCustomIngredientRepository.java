package com.ssafy.recipe.db.repository;

import com.ssafy.recipe.db.entity.RecipeCustomIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeCustomIngredientRepository extends JpaRepository<RecipeCustomIngredient, Integer> {
}
