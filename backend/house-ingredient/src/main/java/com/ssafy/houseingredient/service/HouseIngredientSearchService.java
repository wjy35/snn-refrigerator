package com.ssafy.houseingredient.service;

import com.ssafy.houseingredient.db.entity.HouseIngredientEntity;

import java.util.Optional;

public interface HouseIngredientSearchService {
    Optional<HouseIngredientEntity> searchByHouseIngredientId(Integer houseIngredientId);
}
