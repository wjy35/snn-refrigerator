package com.ssafy.ingredient.service.impl;

import com.ssafy.ingredient.db.entity.IngredientInfoEntity;
import com.ssafy.ingredient.db.repository.IngredientInfoRepository;
import com.ssafy.ingredient.service.IngredientInfoSearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class IngredientInfoSearchServiceImpl implements IngredientInfoSearchService {

    private final IngredientInfoRepository ingredientInfoRepository;

    @Override
    public Optional<IngredientInfoEntity> searchByIngredientInfoId(Short ingredientInfoId) {
        return ingredientInfoRepository.findByIngredientInfoId(ingredientInfoId);
    }
}
