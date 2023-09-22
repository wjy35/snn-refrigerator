package com.ssafy.houseingredient.service;

import com.ssafy.houseingredient.db.entity.HouseIngredientEntity;
import com.ssafy.houseingredient.db.repository.HouseIngredientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class HouseIngredientServiceImpl implements HouseIngredientService {

    private final HouseIngredientRepository houseIngredientRepository;

    @Override
    public Optional<HouseIngredientEntity> searchById(Integer houseIngredientId) {
        return houseIngredientRepository.findById(houseIngredientId);
    }

    @Override
    public void saveAll(List<HouseIngredientEntity> houseIngredientEntities) {
        houseIngredientRepository.saveAll(houseIngredientEntities);
    }

    @Override
    public void save(HouseIngredientEntity houseIngredientEntity) {
        houseIngredientRepository.save(houseIngredientEntity);
    }

    @Override
    public List<HouseIngredientEntity> searchAllByHouseCode(String houseCode) {
        return houseIngredientRepository.findAllByHouseCode(houseCode);
    }

    @Override
    public void deleteById(Integer houseIngredientId) {
        houseIngredientRepository.deleteById(houseIngredientId);
    }

    @Override
    public void deleteAllByHouseCode(String houseCode) {
        houseIngredientRepository.deleteAllByHouseCode(houseCode);
    }
}
