package com.ssafy.recipe.api.mapper;

import com.ssafy.recipe.api.request.RecipeRequest;
import com.ssafy.recipe.db.entity.Recipe;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface RecipeMapper {
    RecipeMapper INSTANCE = Mappers.getMapper(RecipeMapper.class);

    Recipe recipeRequestToRecipe(RecipeRequest request);
}
