package com.ssafy.ingredientautocomplete.api.mapper;

import com.ssafy.ingredientautocomplete.api.response.IngredientAutocompleteResponse;
import com.ssafy.ingredientautocomplete.db.entity.IngredientInfoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface IngredientAutocompleteMapper {
    IngredientAutocompleteMapper INSTANCE = Mappers.getMapper(IngredientAutocompleteMapper.class);
    List<IngredientAutocompleteResponse> entityToResponse(List<IngredientInfoEntity> ingredientInfoEntities);
}
