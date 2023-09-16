package com.ssafy.recipe.api.mapper;

import com.ssafy.recipe.api.request.RecipeIngredientParam;
import com.ssafy.recipe.db.entity.RecipeCustomIngredient;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface RecipeCustomIngredientMapper {
    RecipeCustomIngredientMapper INSTANCE = Mappers.getMapper(RecipeCustomIngredientMapper.class);

    RecipeCustomIngredient recipeIngredientParamToRecipeCustomIngredient(RecipeIngredientParam recipeIngredientParam);
}
