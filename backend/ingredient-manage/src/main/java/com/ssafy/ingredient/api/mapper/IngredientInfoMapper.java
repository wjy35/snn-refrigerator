package com.ssafy.ingredient.api.mapper;


import com.ssafy.ingredient.api.response.IngredientInfo;
import com.ssafy.ingredient.db.entity.IngredientInfoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface IngredientInfoMapper {
    IngredientInfoMapper INSTANCE = Mappers.getMapper(IngredientInfoMapper.class);

    IngredientInfo entityToResponse(IngredientInfoEntity ingredientInfoEntity);
}
