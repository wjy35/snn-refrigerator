package com.ssafy.recipe.db.repository;

import com.ssafy.recipe.db.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

}
