package com.ssafy.recipe;

import com.netflix.discovery.converters.Auto;
import com.ssafy.recipe.api.request.RecipeSearchRequest;
import com.ssafy.recipe.api.response.HouseIngredientResponse;
import com.ssafy.recipe.api.response.MemberResponse;
import com.ssafy.recipe.api.response.RecipeSearchResponse;
import com.ssafy.recipe.db.entity.IngredientInfo;
import com.ssafy.recipe.db.entity.Recipe;
import com.ssafy.recipe.db.repository.IngredientInfoRepository;
import com.ssafy.recipe.db.repository.RecipeRepository;
import com.ssafy.recipe.service.RecipeSearchService;
import com.ssafy.recipe.service.feign.HouseIngredientFeign;
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

    @Autowired
    HouseIngredientFeign houseIngredientFeign;

    @Autowired
    IngredientInfoRepository ingredientInfoRepository;

    @Test
    void getAllRecipeTest(){
//        String keyword, List<IngredientInfo> requiredIngredients,
//         List<IngredientInfo> excludedIngredients, int missingIngredientCount)

        //given
        String keyword = "";
        List<IngredientInfo> requredIngredients = new ArrayList<>();
//        IngredientInfo ingredientInfo1 = IngredientInfo.builder()
//                .ingredientInfoId((short) 1)
//                .ingredientName("양파")
//                .build();
//        IngredientInfo ingredientInfo2 = IngredientInfo.builder()
//                .ingredientInfoId((short) 2)
//                .ingredientName("참치")
//                .build();
//
//        requredIngredients.add(ingredientInfo1);
//        requredIngredients.add(ingredientInfo2);

        List<IngredientInfo> excludedIngredients = new ArrayList<>();
//        IngredientInfo ingredientInfo3 = IngredientInfo.builder()
//                .ingredientInfoId((short) 3)
//                .ingredientName("감자")
//                .build();
        int missingIngredientCount=0;
//        excludedIngredients.add(ingredientInfo3);

        if(requredIngredients.size() == 0){
            requredIngredients = ingredientInfoRepository.findAll();
        }

        System.out.println("------------------------------------         "+requredIngredients.size());


        RecipeSearchRequest request = RecipeSearchRequest.builder()
                .memberId(3029548333l)
                .requiredIngredients(requredIngredients)
                .missingIngredientCount(missingIngredientCount)
                .keyword(keyword)
                .excludedIngredients(excludedIngredients).build();
        // when
//        List<RecipeSearchResponse> list = recipeSearchService.getSearchRecipe(request);

        // then
//        System.out.println(list.size());
//        System.out.println(list.get(0).getRecipeId());
//        System.out.println(list.get(0).getTitle());
    }

    @Test
    void getRecipeSearchResponseTest(){
        // given
        String houseCode = "";

        // when
        List<HouseIngredientResponse> list = recipeSearchService.getHouseIngredientResponse(houseCode);

        // then
        System.out.println(list.size());

        for(int i=0; i<list.size(); i++){
            System.out.println(list.get(i).toString());
        }
    }
}
