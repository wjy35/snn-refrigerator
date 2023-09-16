package com.ssafy.recipe;

import com.ssafy.recipe.api.request.RecipeDetailParam;
import com.ssafy.recipe.api.request.RecipeIngredientParam;
import com.ssafy.recipe.api.request.RecipeRequest;
import com.ssafy.recipe.api.response.ContentParam;
import com.ssafy.recipe.db.entity.Recipe;
import com.ssafy.recipe.db.entity.RecipeDetail;
import com.ssafy.recipe.db.repository.RecipeRepository;
import com.ssafy.recipe.service.RecipeServiceImpl;
import com.ssafy.recipe.service.feign.MemberFeign;
import com.ssafy.recipe.api.response.MemberResponse;
//import com.ssafy.recipe.service.RecipeServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RecipeApplicationTests {

	@Autowired
	MemberFeign memberFeign;

	@Autowired
	RecipeServiceImpl recipeService;

	@Autowired
	RecipeRepository recipeRepository;

	@Test
	void test(){
		Optional<MemberResponse> memberResponse = memberFeign.getMemberDetail(1);

		assertNotNull(memberResponse);
		System.out.println(memberResponse.get().getNickname());
	}

	@Test
	void saveRecipeTest(){
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

		// when & then
		recipeService.saveRecipe(recipe);
	}


	@Test
	void saveRecipeDetailsTest(){
		// given
		Optional<Recipe> recipe = recipeRepository.findById(37);

		// when & then
		if(recipe.isPresent()){
			recipeService.saveRecipeDetails(recipe.get(), getRequest());
		}

	}

	@Test
	void isCustomIngredientTest(){
		// given
		Optional<Recipe> recipe = recipeRepository.findById(37);

		// when & then
		if(recipe.isPresent()){
			recipeService.isCustomIngredient(recipe.get(), getRequest());
		}
	}

	@Test
	void getRecipeDetailTest(){
		// given
		int recipeId = 37;

		// when
		List<ContentParam> list = recipeService.getRecipeDetail(recipeId);

		// then
		assertEquals(list.size(), 3);
	}

	@Test
	void deleteRecipeTest(){
		// given
		int recipeId = 37;

		// when
		recipeService.deleteRecipe(recipeId);

		Optional<Recipe> recipeOptional = recipeRepository.findById(37);
		// then
		assertFalse(recipeOptional.isPresent());
	}





	private static RecipeRequest getRequest(){
		List<RecipeDetailParam> recipeDetailParams = new ArrayList<>();
		for(int i=1; i<4; i++){
			recipeDetailParams.add(new RecipeDetailParam(String.valueOf(i), "111111"));
		}

		List<RecipeIngredientParam> recipeIngredientParams = new ArrayList<>();
		recipeIngredientParams.add(new RecipeIngredientParam("양파", "600g", (short) 1));
		recipeIngredientParams.add(new RecipeIngredientParam("곽민규", "500g", (short) -1));

		return new RecipeRequest("왕준영찜", 1234L,"123분","김치찌개","imageUrl",(byte) 2, "youtubeUrl", recipeDetailParams, recipeIngredientParams);
	}

}
