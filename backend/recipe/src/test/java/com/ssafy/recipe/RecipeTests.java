package com.ssafy.recipe;

import com.ssafy.recipe.api.request.RecipeDetailParam;
import com.ssafy.recipe.api.request.RecipeDetailRequest;
import com.ssafy.recipe.api.request.RecipeIngredientParam;
import com.ssafy.recipe.api.request.RecipeRequest;
import com.ssafy.recipe.api.response.ContentParam;
import com.ssafy.recipe.api.response.RecipeDetailResponse;
import com.ssafy.recipe.db.entity.Recipe;
import com.ssafy.recipe.db.entity.RecipeIngredient;
import com.ssafy.recipe.db.repository.RecipeRepository;
import com.ssafy.recipe.service.RecipeServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
public class RecipeTests {

    @Autowired
    RecipeServiceImpl recipeService;

    @Autowired
    RecipeRepository recipeRepository;


    int recipeId = 48;
    @Test
    void saveRecipeTest(){
        // given
        Recipe recipe = Recipe.builder()
                .memberId(1234l)
                .title("왕준영찌찌찜")
                .imageUrl("imageURL")
                .youtubeUrl("youtubeURL")
                .serving((byte) 6)
                .cookingTime("120분")
                .foodName("김치찜")
                .build();

        // when & then
        recipeService.saveRecipe(recipe);
    }


    @Test
    void saveRecipeDetailsTest(){
        // given
        Optional<Recipe> recipe = recipeRepository.findById(recipeId);

        // when & then
        if(recipe.isPresent()){
            recipeService.saveRecipeDetails(recipe.get(), getRequest());
        }

    }

    @Test
    void isCustomIngredientTest(){
        // given
        Optional<Recipe> recipe = recipeRepository.findById(recipeId);

        // when & then
        if(recipe.isPresent()){
            recipeService.isCustomIngredient(recipe.get(), getRequest());
        }
    }

    @Test
    void getRecipeDetailTest(){
        // when
        List<ContentParam> list = recipeService.getRecipeDetail(45);

        // then
        assertEquals(list.size(), 3);
    }

    @Test
    void deleteRecipeTest(){
        // when
        recipeService.deleteRecipe(recipeId);

        Optional<Recipe> recipeOptional = recipeRepository.findById(recipeId);
        // then
        assertFalse(recipeOptional.isPresent());
    }


    @Test
    void updeateRecipeTest(){
        // given
        Recipe recipe = Recipe.builder()
                .memberId(1234l)
                .title("왕준영찜")
                .imageUrl("imageURL")
                .youtubeUrl("youtubeURL")
                .serving((byte) 6)
                .cookingTime("120분")
                .foodName("김치찌개")
                .build();
    }

    @Test
    void getMemberInfo(){
        // given
        int recipeId = 45;
        long memberId = 1;

        RecipeDetailRequest request = RecipeDetailRequest.builder()
                .recipeId(recipeId)
                .memberId(memberId)
                .build();

        // when
        RecipeDetailResponse recipeDetailResponse = recipeService.getRecipe(request);

        // then
        System.out.println(recipeDetailResponse.toString());
    }

    private static RecipeRequest getRequest(){
        List<RecipeDetailParam> recipeDetailParams = new ArrayList<>();
        for(int i=1; i<4; i++){
            recipeDetailParams.add(new RecipeDetailParam(String.valueOf(i), "111111"));
        }

        List<RecipeIngredientParam> recipeIngredientParams = new ArrayList<>();
        recipeIngredientParams.add(new RecipeIngredientParam("양파", "600g", (short) 1));
        recipeIngredientParams.add(new RecipeIngredientParam("참치", "500g", (short) 2));
        recipeIngredientParams.add(new RecipeIngredientParam("감자", "500g", (short) -1));

        return new RecipeRequest("왕준영찜", 1234L,"125분","이거나오냐","imageUrl",(byte) 2, "youtubeUrl", recipeDetailParams, recipeIngredientParams);
    }
}
