package com.ssafy.reciperecommend.db.repository;

import com.ssafy.reciperecommend.db.entity.Recipe;
import com.ssafy.reciperecommend.db.entity.RecipeCustomIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeCustomIngredientRepository extends JpaRepository<RecipeCustomIngredient, Integer> {

    List<RecipeCustomIngredient> findAllByRecipe(Recipe recipe);

    int countAllByRecipe(Recipe recipe);
}

