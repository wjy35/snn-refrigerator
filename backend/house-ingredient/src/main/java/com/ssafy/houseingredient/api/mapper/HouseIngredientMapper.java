package com.ssafy.houseingredient.api.mapper;

import com.ssafy.houseingredient.api.request.HouseIngredientDetailParam;
import com.ssafy.houseingredient.api.request.HouseIngredientSaveRequest;
import com.ssafy.houseingredient.api.response.HouseIngredientResponse;
import com.ssafy.houseingredient.db.entity.HouseIngredientEntity;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface HouseIngredientMapper {

    HouseIngredientMapper INSTANCE = Mappers.getMapper(HouseIngredientMapper.class);

    HouseIngredientResponse entityToResponse(HouseIngredientEntity houseIngredientEntity);

    List<HouseIngredientResponse> entityToResponse(List<HouseIngredientEntity> houseIngredientEntity);

//    HouseIngredientEntity saveRequestToEntity(HouseIngredientSaveRequest houseIngredientSaveRequest);

    List<HouseIngredientEntity> saveAllRequestToEntity(List<HouseIngredientDetailParam> houseIngredientDetailParams);
}
