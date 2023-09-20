package com.ssafy.reciperecommend.db.repository;

import com.ssafy.reciperecommend.db.entity.Recipe;
import com.ssafy.reciperecommend.db.entity.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Integer> {

    List<RecipeIngredient> findAllByRecipe(Recipe recipe);

    int countAllByRecipe(Recipe recipe);

}
