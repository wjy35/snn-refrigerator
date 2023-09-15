package com.ssafy.ingredient.db.repository;

import com.ssafy.ingredient.db.entity.IngredientInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface IngredientInfoRepository extends CrudRepository<IngredientInfoEntity, Short> {
    Optional<IngredientInfoEntity> findByIngredientInfoId(Short ingredientInfoId);
    IngredientInfoEntity save(IngredientInfoEntity ingredientInfoEntity);
}
