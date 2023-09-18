package com.ssafy.houseingredient.service;

import com.ssafy.houseingredient.db.entity.HouseIngredientEntity;
import com.ssafy.houseingredient.db.repository.HouseIngredientRepository;
import com.ssafy.houseingredient.service.HouseIngredientService;
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
    public Optional<HouseIngredientEntity> searchByHouseIngredientId(Integer houseIngredientId) {
        return houseIngredientRepository.findByHouseIngredientId(houseIngredientId);
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
    public List<HouseIngredientEntity> searchAllByHouseSeq(Integer houseSeq) {
        return houseIngredientRepository.findAllByHouseSeq(houseSeq);
    }
}
