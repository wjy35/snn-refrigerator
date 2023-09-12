package com.ssafy.recipe.service;

import com.ssafy.recipe.api.Mapper.RecipeDetailMapper;
import com.ssafy.recipe.api.Mapper.RecipeMapper;
import com.ssafy.recipe.api.request.RecipeRequest;
import com.ssafy.recipe.db.entity.Recipe;
import com.ssafy.recipe.db.entity.RecipeDetail;
import com.ssafy.recipe.db.resository.RecipeDetailRepository;
import com.ssafy.recipe.db.resository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService{

    private final RecipeMapper recipeMapper;

    private final RecipeDetailMapper recipeDetailMapper;

    private final RecipeRepository recipeRepository;

    private final RecipeDetailRepository recipeDetailRepository;

    @Override
    public void createRecipe(RecipeRequest request) {
        Recipe recipe = recipeMapper.recipeRequestToRecipe(request);

        recipeRepository.save(recipe);

        List<RecipeDetail> recipeDetails = recipeDetailMapper.recipeDetailRequestsToRecipeDetails(request.getContent());

        for (RecipeDetail recipeDetail : recipeDetails) {
            recipeDetail.setRecipe(recipe);
        }

        recipeDetailRepository.saveAll(recipeDetails);
    }

}
