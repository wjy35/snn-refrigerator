package com.ssafy.recipe.api.mapper;

import com.ssafy.recipe.api.request.RecipeIngredientParam;
import com.ssafy.recipe.db.entity.RecipeIngredient;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface RecipeIngredientMapper {
    RecipeIngredientMapper INSTANCE = Mappers.getMapper(RecipeIngredientMapper.class);


    RecipeIngredient recipeIngredientParamToRecipeIngredients(RecipeIngredientParam recipeIngredientParam);
}
