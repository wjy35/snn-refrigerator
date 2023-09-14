package com.ssafy.houseingredient;

import com.ssafy.houseingredient.db.entity.HouseIngredientEntity;
import com.ssafy.houseingredient.db.repository.HouseIngredientRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.NoSuchElementException;

@SpringBootTest
class HouseIngredientApplicationTests {

	@Autowired
	HouseIngredientRepository houseIngredientRepository;

	@Test
	void contextLoads() {
		Assertions.assertNotNull(houseIngredientRepository);
	}

	@Test
	void selectHouseIngredientTest(){
		//given
		Integer houseIngredientId = 1;

		//when
		HouseIngredientEntity selectedHouseIngredientEntity = houseIngredientRepository.findByHouseIngredientId(houseIngredientId).get();

		//then
		System.out.println("selectedHouseIngredientInfo = " + selectedHouseIngredientEntity);
		Assertions.assertEquals("테스트 커스텀 식재료", selectedHouseIngredientEntity.getIngredientInfoName());
	}

	@Test
	void selectFailHouseIngredientTest(){
		//given
		Integer houseIngredientId = 0;

		//when-then
		Assertions.assertThrows(NoSuchElementException.class,()->{
			HouseIngredientEntity selectedHouseIngredientEntity = houseIngredientRepository.findByHouseIngredientId(houseIngredientId).get();
		});
	}

}
