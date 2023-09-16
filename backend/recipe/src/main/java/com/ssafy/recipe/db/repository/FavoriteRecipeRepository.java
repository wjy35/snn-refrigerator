package com.ssafy.recipe.db.repository;

import com.ssafy.recipe.db.entity.FavoriteRecipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteRecipeRepository extends JpaRepository<FavoriteRecipe, Integer> {
    Optional<FavoriteRecipe> findByRecipeRecipeIdAndMemberId(int recipeId, Long memberId);

}
