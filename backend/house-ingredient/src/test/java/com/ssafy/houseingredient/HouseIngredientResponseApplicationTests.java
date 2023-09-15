package com.ssafy.houseingredient;

import com.ssafy.houseingredient.api.controller.HouseIngredientController;
import com.ssafy.houseingredient.api.request.HouseIngredientDetailParam;
import com.ssafy.houseingredient.api.response.Response;
import com.ssafy.houseingredient.db.entity.HouseIngredientEntity;
import com.ssafy.houseingredient.db.repository.HouseIngredientRepository;
import com.ssafy.houseingredient.service.HouseIngredientService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@SpringBootTest
class HouseIngredientResponseApplicationTests {

	@Autowired
	HouseIngredientRepository houseIngredientRepository;
	@Autowired
	HouseIngredientService houseIngredientService;
	@Autowired
	HouseIngredientController houseIngredientController;

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
		Assertions.assertEquals("테스트 커스텀 식재료", selectedHouseIngredientEntity.getIngredientName());
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

	@Test
	void searchHouseIngredientTest(){
		//given
		Integer houseIngredientId = 1;

		//when
		ResponseEntity<Response> response = houseIngredientController.search(houseIngredientId);

		//then
		System.out.println("response = " + response);
		System.out.println(response.getBody().getData().get("houseIngredient"));
		Assertions.assertNotNull(response.getBody().getData());
	}

	@Test
	@Transactional
	void insertHouseIngredientTest(){
		// TODO : fix this

		//given
		List<HouseIngredientEntity> insertedEntities = new ArrayList<>();
		insertedEntities.add(HouseIngredientEntity.builder()
				.houseSeq(123).ingredientInfoId((short)-1).ingredientName("갈비만두").storageType((byte)1).build());

		//when
		List<HouseIngredientEntity> selectedEntities = houseIngredientRepository.saveAll(insertedEntities);

		//then
		System.out.println("selectedEntities = " + selectedEntities);
		Assertions.assertNotNull(selectedEntities);
		Assertions.assertEquals(selectedEntities.size(),insertedEntities.size());
	}


}
