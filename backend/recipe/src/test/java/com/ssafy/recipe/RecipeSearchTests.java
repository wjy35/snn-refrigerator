package com.ssafy.recipe;

import com.netflix.discovery.converters.Auto;
import com.ssafy.recipe.api.response.HouseIngredientResponse;
import com.ssafy.recipe.api.response.MemberResponse;
import com.ssafy.recipe.db.entity.IngredientInfo;
import com.ssafy.recipe.db.entity.Recipe;
import com.ssafy.recipe.db.repository.RecipeRepository;
import com.ssafy.recipe.service.RecipeSearchService;
import com.ssafy.recipe.service.feign.MemberFeign;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class RecipeSearchTests {

    @Autowired
    RecipeSearchService recipeSearchService;

    @Autowired
    RecipeRepository recipeRepository;


    @Test
    void getAllRecipeTest(){
        //String keyword, List<IngredientInfo> requiredIngredients,
        // List<IngredientInfo> excludedIngredients, int missingIngredientCount)

        //given
        String keyword = "왕준영";
        List<IngredientInfo> requredIngredients = new ArrayList<>();
        IngredientInfo ingredientInfo1 = IngredientInfo.builder()
                .ingredientInfoId((short) 1)
                .ingredientName("양파")
                .build();
        IngredientInfo ingredientInfo2 = IngredientInfo.builder()
                .ingredientInfoId((short) 2)
                .ingredientName("참치")
                .build();

        requredIngredients.add(ingredientInfo1);
        requredIngredients.add(ingredientInfo2);

        List<IngredientInfo> excludedIngredients = new ArrayList<>();
        IngredientInfo ingredientInfo3 = IngredientInfo.builder()
                .ingredientInfoId((short) 3)
                .ingredientName("감자")
                .build();
        int missingIngredientCount=0;
        excludedIngredients.add(ingredientInfo3);

        // when
//        List<Recipe> list = recipeSearchService.getSearchRecipe(keyword, requredIngredients, excludedIngredients, missingIngredientCount);

        // then
//        System.out.println(list.size());
//        System.out.println(list.get(0).getRecipeId());
//        System.out.println(list.get(0).getTitle());
    }

    @Test
    void getRecipeSearchResponseTest(){
        // given
        int houseSeq = 1;

        // when
        List<HouseIngredientResponse> list = recipeSearchService.getHouseIngredientResponse(houseSeq);

        // then
        System.out.println(list.size());

        for(int i=0; i<list.size(); i++){
            System.out.println(list.get(i).toString());
        }
    }
}
