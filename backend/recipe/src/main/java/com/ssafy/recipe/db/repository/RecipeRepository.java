package com.ssafy.recipe.db.repository;

import com.ssafy.recipe.db.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    List<Recipe> findAllByMemberId(long memberId);
    Recipe findByRecipeId(long memberId);

}
