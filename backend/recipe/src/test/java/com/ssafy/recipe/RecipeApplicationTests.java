package com.ssafy.recipe;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netflix.discovery.converters.Auto;
import com.ssafy.recipe.api.request.RecipeDetailParam;
import com.ssafy.recipe.api.request.RecipeIngredientParam;
import com.ssafy.recipe.api.request.RecipeRequest;
import com.ssafy.recipe.api.response.ContentParam;
import com.ssafy.recipe.api.response.HouseIngredientResponse;
import com.ssafy.recipe.db.entity.Recipe;
import com.ssafy.recipe.db.entity.RecipeDetail;
import com.ssafy.recipe.db.repository.RecipeRepository;
import com.ssafy.recipe.service.FavoriteRecipeServiceImpl;
import com.ssafy.recipe.service.RecipeServiceImpl;
import com.ssafy.recipe.service.feign.HouseIngredientFeign;
import com.ssafy.recipe.service.feign.MemberFeign;
import com.ssafy.recipe.api.response.MemberResponse;
//import com.ssafy.recipe.service.RecipeServiceImpl;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.EmptyResultDataAccessException;

import java.io.DataInput;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RecipeApplicationTests {

	@Autowired
	MemberFeign memberFeign;

	@Autowired
	HouseIngredientFeign houseIngredientFeign;

	@Test
	void test(){
		Optional<MemberResponse> memberResponse = memberFeign.getMemberDetail(1);
		System.out.println(memberResponse.toString());
		assertNotNull(memberResponse);
	}

	@Test
	void houseIngredientFeignTest() throws JSONException {
		String st = houseIngredientFeign.getHouseIngredient(1);

		System.out.println(st);
		JSONObject jsonObject = new JSONObject(st);

		// "request" 객체에서 "houseSeq" 값을 추출
		JSONArray ingredientsArray = jsonObject.getJSONObject("data").getJSONArray("ingredients");

		// 결과를 저장할 리스트
		List<HouseIngredientResponse> resultList = new ArrayList<>();

		// "ingredients" 배열을 순회하면서 필요한 데이터를 추출하여 객체로 만들고 리스트에 추가
		for (int i = 0; i < ingredientsArray.length(); i++) {
			JSONObject ingredientObject = ingredientsArray.getJSONObject(i);
			int ingredientInfoId = ingredientObject.getInt("ingredientInfoId");
			String ingredientName = ingredientObject.getString("ingredientName");

			HouseIngredientResponse houseIngredientResponse = HouseIngredientResponse.builder()
					.ingredientInfoId(ingredientInfoId)
					.ingredientName(ingredientName).build();

			resultList.add(houseIngredientResponse);
		}
	}
}
