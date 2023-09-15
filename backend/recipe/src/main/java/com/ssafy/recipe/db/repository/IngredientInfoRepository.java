package com.ssafy.recipe.db.repository;

import com.ssafy.recipe.db.entity.IngredientInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientInfoRepository extends JpaRepository<IngredientInfo, Short> {
}
