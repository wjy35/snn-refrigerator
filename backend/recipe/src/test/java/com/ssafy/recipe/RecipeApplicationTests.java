package com.ssafy.recipe;

import com.netflix.discovery.converters.Auto;
import com.ssafy.recipe.api.request.RecipeDetailParam;
import com.ssafy.recipe.api.request.RecipeIngredientParam;
import com.ssafy.recipe.api.request.RecipeRequest;
import com.ssafy.recipe.api.response.ContentParam;
import com.ssafy.recipe.db.entity.Recipe;
import com.ssafy.recipe.db.entity.RecipeDetail;
import com.ssafy.recipe.db.repository.RecipeRepository;
import com.ssafy.recipe.service.FavoriteRecipeServiceImpl;
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

	@Test
	void test(){
		Optional<MemberResponse> memberResponse = memberFeign.getMemberDetail(1);

		assertNotNull(memberResponse);
		System.out.println(memberResponse.get().getNickname());
	}


}
