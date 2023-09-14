package com.ssafy.houseingredient.service.impl;

import com.ssafy.houseingredient.db.entity.HouseIngredientEntity;
import com.ssafy.houseingredient.db.repository.HouseIngredientRepository;
import com.ssafy.houseingredient.service.HouseIngredientSearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class HouseIngredientSearchServiceImpl implements HouseIngredientSearchService {

    private final HouseIngredientRepository houseIngredientRepository;


    @Override
    public Optional<HouseIngredientEntity> searchByHouseIngredientId(Integer houseIngredientId) {
        return houseIngredientRepository.findByHouseIngredientId(houseIngredientId);
    }
}
