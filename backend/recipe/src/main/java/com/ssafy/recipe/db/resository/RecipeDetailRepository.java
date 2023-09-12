package com.ssafy.recipe.db.resository;

import com.ssafy.recipe.db.entity.RecipeDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeDetailRepository extends JpaRepository<RecipeDetail, Integer> {
    List<RecipeDetail> findByRecipeRecipeId(int recipeId);
}
