package com.ssafy.recipe.api.mapper;

import com.ssafy.recipe.api.request.RecipeIngredientRequest;
import com.ssafy.recipe.db.entity.RecipeIngredient;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RecipeIngredientMapper {
    RecipeIngredientMapper INSTANCE = Mappers.getMapper(RecipeIngredientMapper.class);


    RecipeIngredient recipeIngredientRequestsToRecipeIngredients(RecipeIngredientRequest recipeIngredientRequest);
}
