package com.ssafy.ingredientextract.ingredient.db;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientInfoRepository extends JpaRepository<IngredientInfo, Short> {
    IngredientInfo save(IngredientInfo ingredientInfo);

    List<IngredientInfo> findAll();
}
