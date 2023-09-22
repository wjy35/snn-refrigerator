package com.ssafy.reciperecommend.db.repository;

import com.ssafy.reciperecommend.db.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
}
