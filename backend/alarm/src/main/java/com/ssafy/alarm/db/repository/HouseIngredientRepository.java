package com.ssafy.alarm.db.repository;

import com.ssafy.alarm.db.entity.HouseIngredientEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HouseIngredientRepository extends JpaRepository<HouseIngredientEntity, Integer> {
    List<HouseIngredientEntity> findAllByHouseCode(String houseCode);
}
