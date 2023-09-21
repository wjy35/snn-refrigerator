package com.ssafy.houseingredient.service;

import com.ssafy.houseingredient.db.entity.HouseIngredientEntity;

import java.util.List;
import java.util.Optional;

public interface HouseIngredientService {
    Optional<HouseIngredientEntity> searchById(Integer houseIngredientId);
    void saveAll(List<HouseIngredientEntity> houseIngredientEntities);
    void save(HouseIngredientEntity houseIngredientEntity);
    List<HouseIngredientEntity> searchAllByHouseCode(String houseCode);
    void deleteById(Integer houseIngredientId);
    void deleteAllByHouseCode(String houseCode);
}
