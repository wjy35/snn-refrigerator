package com.ssafy.ingredientautocomplete.db.repository;

import com.ssafy.ingredientautocomplete.db.entity.IngredientInfoEntity;
import org.springframework.data.repository.CrudRepository;

public interface IngredientInfoRepository extends CrudRepository<IngredientInfoEntity,Short> {
}
