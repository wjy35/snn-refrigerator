package com.ssafy.ingredientautocomplete;

import com.ssafy.ingredientautocomplete.api.controller.IngredientAutocompleteController;
import com.ssafy.ingredientautocomplete.api.response.IngredientAutocompleteResponse;
import com.ssafy.ingredientautocomplete.api.response.Response;
import com.ssafy.ingredientautocomplete.db.repository.IngredientInfoRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import java.util.List;

@SpringBootTest
class IngredientAutocompleteApplicationTests {

	@Autowired
	IngredientAutocompleteController ingredientAutocompleteController;

	@Test
	void contextLoads() {
	}

	@Test
	void startWithTest() {
		ResponseEntity<Response> response = ingredientAutocompleteController.search("가");

		List<IngredientAutocompleteResponse> ingredients = (List<IngredientAutocompleteResponse>) response.getBody().getData().get("ingredients");
		Assertions.assertEquals(17, ingredients.size());
//		System.out.println(ingredients);
	}

}
