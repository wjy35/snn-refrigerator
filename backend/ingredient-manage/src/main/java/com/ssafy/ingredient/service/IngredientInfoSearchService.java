package com.ssafy.ingredient.service;

import com.ssafy.ingredient.db.entity.IngredientInfoEntity;
import java.util.Optional;

public interface IngredientInfoSearchService {
    Optional<IngredientInfoEntity> searchByIngredientInfoId(Short ingredientInfoId);
}
