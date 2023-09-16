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
        int recipId = 1;
        long memberId = 123;
        Optional<Recipe> recipe =  recipeRepository.findById(41);

        FavoriteRecipe favoriteRecipe = FavoriteRecipe.builder()
                .memberId(123)
                .recipe(recipe.get())
                .build();

        // when
        FavoriteRecipe favoriteRecipe1= favoriteRecipeRepository.save(favoriteRecipe);

        // then
        assertNotNull(favoriteRecipe1);
    }
}
