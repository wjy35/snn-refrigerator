package com.ssafy.ingredient.db.repository;

import com.ssafy.ingredient.db.entity.IngredientInfoEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IngredientInfoRepository extends CrudRepository<IngredientInfoEntity, Short> {
    Optional<IngredientInfoEntity> findByIngredientInfoId(Short ingredientInfoId);
}