package com.ssafy.recipe.db.resository;

import com.ssafy.recipe.db.entity.RecipeDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeDetailRepository extends JpaRepository<RecipeDetail, Integer> {
}
