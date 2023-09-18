package com.ssafy.ingredient.api.mapper;

import com.ssafy.ingredient.api.response.IngredientInfoResponse;
import com.ssafy.ingredient.db.entity.IngredientInfoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface IngredientInfoMapper {
    IngredientInfoMapper INSTANCE = Mappers.getMapper(IngredientInfoMapper.class);

    IngredientInfoResponse entityToResponse(IngredientInfoEntity ingredientInfoEntity);
}