package com.ssafy.houseingredient.api.mapper;

import com.ssafy.houseingredient.api.response.HouseIngredient;
import com.ssafy.houseingredient.db.entity.HouseIngredientEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HouseIngredientMapper {
    HouseIngredientMapper INSTANCE = Mappers.getMapper(HouseIngredientMapper.class);

    HouseIngredient entityToResponse(HouseIngredientEntity houseIngredientEntity);
}
