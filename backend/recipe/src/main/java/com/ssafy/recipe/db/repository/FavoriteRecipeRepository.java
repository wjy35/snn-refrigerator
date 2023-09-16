package com.ssafy.recipe.db.repository;

import com.ssafy.recipe.db.entity.FavoriteRecipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRecipeRepository extends JpaRepository<FavoriteRecipe, Integer> {
}
