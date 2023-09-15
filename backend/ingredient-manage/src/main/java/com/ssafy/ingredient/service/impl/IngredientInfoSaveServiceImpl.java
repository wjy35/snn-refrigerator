package com.ssafy.ingredient.service.impl;

import com.ssafy.ingredient.db.entity.IngredientInfoEntity;
import com.ssafy.ingredient.db.repository.IngredientInfoRepository;
import com.ssafy.ingredient.service.IngredientInfoSaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IngredientInfoSaveServiceImpl implements IngredientInfoSaveService {
    private final IngredientInfoRepository ingredientInfoRepository;

    @Override
    public void save(IngredientInfoEntity ingredientInfoEntity) {
        ingredientInfoRepository.save(ingredientInfoEntity);
    }
}
