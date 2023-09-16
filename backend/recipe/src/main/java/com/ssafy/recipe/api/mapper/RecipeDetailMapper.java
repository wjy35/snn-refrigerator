package com.ssafy.recipe.api.mapper;

import com.ssafy.recipe.api.request.RecipeDetailParam;
import com.ssafy.recipe.api.response.ContentParam;
import com.ssafy.recipe.db.entity.RecipeDetail;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RecipeDetailMapper {
    RecipeDetailMapper INSTANCE = Mappers.getMapper(RecipeDetailMapper.class);

    List<RecipeDetail>contentsToRecipeDetails(List<RecipeDetailParam> contents);

    ContentParam map(RecipeDetail value);

    List<ContentParam> recipeDetailsToContentParam(List<RecipeDetail> recipeDetails);

}
