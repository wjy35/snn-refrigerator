package com.ssafy.houseingredient.db.repository;

import com.ssafy.houseingredient.db.entity.HouseIngredientEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface HouseIngredientRepository extends CrudRepository<HouseIngredientEntity, Integer> {
    Optional<HouseIngredientEntity> findByHouseIngredientId(Integer houseIngredientId);
}
