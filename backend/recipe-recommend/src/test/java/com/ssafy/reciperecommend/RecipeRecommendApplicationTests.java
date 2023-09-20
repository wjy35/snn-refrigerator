package com.ssafy.reciperecommend;

import com.ssafy.reciperecommend.api.response.RecipeRecommendResponse;
import com.ssafy.reciperecommend.db.entity.Recipe;
import com.ssafy.reciperecommend.service.RecipeRecommendService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class RecipeRecommendApplicationTests {

	@Autowired
	RecipeRecommendService recipeRecommendService;


	@Test
	void getRecipe() {
		// given
		long memberId = 1;

		List<RecipeRecommendResponse> list = recipeRecommendService.getRecipeRecommend(memberId);

		System.out.println(list.size());

		for(int i=0; i<list.size(); i++){
			System.out.println(list.get(i).toString());
		}
	}

}
