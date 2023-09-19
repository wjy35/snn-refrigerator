package com.ssafy.recipe;

import com.netflix.discovery.converters.Auto;
import com.ssafy.recipe.db.entity.FavoriteRecipe;
import com.ssafy.recipe.db.entity.Recipe;
import com.ssafy.recipe.db.repository.FavoriteRecipeRepository;
import com.ssafy.recipe.db.repository.RecipeRepository;
import com.ssafy.recipe.service.FavoriteRecipeServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class FavoriteRecipeTests {

    @Autowired
    FavoriteRecipeServiceImpl favoriteRecipeService;

    @Autowired
    FavoriteRecipeRepository favoriteRecipeRepository;

    @Autowired
    RecipeRepository recipeRepository;

    @Test
    void addFavoriteRecipeTest(){
        // given
        int recipId = 45;
        long memberId = 1;
        Optional<Recipe> recipe =  recipeRepository.findById(recipId);

        FavoriteRecipe favoriteRecipe = FavoriteRecipe.builder()
                .memberId(1)
                .recipe(recipe.get())
                .build();

        // when & then
        favoriteRecipeService.addFavoriteRecipe(recipId, memberId);
    }

    @Test
    void deleteFavoriteRecipe(){
        // given
        long memberId = 123;
        int recipeId = 41;

        // when
        favoriteRecipeService.deleteFavoriteRecipe(recipeId,memberId);
    }
}
