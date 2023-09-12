package com.ssafy.recipe.api.Mapper;

import com.ssafy.recipe.api.request.RecipeDetailRequest;
import com.ssafy.recipe.db.entity.RecipeDetail;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RecipeDetailMapper {
    RecipeDetailMapper INSTANCE = Mappers.getMapper(RecipeDetailMapper.class);
    RecipeDetail recipeDetailRequestToRecipeDetail(RecipeDetailRequest recipeDetailRequest);

    List<RecipeDetail> recipeDetailRequestsToRecipeDetails(List<RecipeDetail> recipeDetailRequests);
}
