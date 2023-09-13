package com.ssafy.recipe;

import com.netflix.discovery.converters.Auto;
import com.ssafy.recipe.api.feign.MemberFeign;
import com.ssafy.recipe.api.response.MemberResponse;
//import com.ssafy.recipe.service.RecipeServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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
