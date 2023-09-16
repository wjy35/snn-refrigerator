package com.ssafy.recipe.service;

import com.ssafy.recipe.db.entity.FavoriteRecipe;
import com.ssafy.recipe.db.entity.Recipe;
import com.ssafy.recipe.db.repository.FavoriteRecipeRepository;
import com.ssafy.recipe.db.repository.RecipeRepository;
import com.ssafy.recipe.exception.CustomException;
import com.ssafy.recipe.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoriteRecipeServiceImpl implements FavoriteRecipeService {

    private final FavoriteRecipeRepository favoriteRecipeRepository;

    private final RecipeRepository recipeRepository;
    @Override
    public void addFavoriteRecipe(int recipeId, long memberId) {
        Optional<Recipe> recipe = recipeRepository.findById(recipeId);

        if(recipe.isEmpty()) throw new CustomException(ErrorCode.NOT_FOUND_RECIPE);

        FavoriteRecipe favoriteRecipe = FavoriteRecipe.builder()
                .recipe(recipe.get())
                .memberId(memberId)
                .build();

        favoriteRecipeRepository.save(favoriteRecipe);
    }
}
