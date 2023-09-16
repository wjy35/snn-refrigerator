package com.ssafy.recipe.api.mapper;

import com.ssafy.recipe.api.request.RecipeRequest;
import com.ssafy.recipe.db.entity.Recipe;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface RecipeMapper {
    RecipeMapper INSTANCE = Mappers.getMapper(RecipeMapper.class);

    @Mapping(target = "recipeId", ignore = true)
    @Mapping(target = "registDatetime", ignore = true)
    @Mapping(target = "modifyDatetime", ignore = true)
//    @Mapping(source = "memberId", target = "memberId")
    Recipe recipeRequestToRecipe(RecipeRequest request);
}
