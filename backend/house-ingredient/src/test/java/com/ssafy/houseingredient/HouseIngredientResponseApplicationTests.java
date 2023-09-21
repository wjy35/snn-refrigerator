package com.ssafy.houseingredient;

import com.ssafy.houseingredient.api.controller.HouseIngredientController;
import com.ssafy.houseingredient.api.exception.NoHouseIngredientException;
import com.ssafy.houseingredient.api.request.HouseIngredientDetailParam;
import com.ssafy.houseingredient.api.request.HouseIngredientSaveAllRequest;
import com.ssafy.houseingredient.api.request.HouseIngredientSaveRequest;
import com.ssafy.houseingredient.api.response.HouseIngredientResponse;
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

import java.time.LocalDate;
import java.util.ArrayList;
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
		HouseIngredientEntity selectedHouseIngredientEntity = houseIngredientRepository.findById(houseIngredientId).get();

		//then
//		System.out.println("selectedHouseIngredientInfo = " + selectedHouseIngredientEntity);
		Assertions.assertEquals("테스트 커스텀 식재료", selectedHouseIngredientEntity.getIngredientName());
	}

	@Test
	void selectFailHouseIngredientTest(){
		//given
		Integer houseIngredientId = 0;

		//when-then
		Assertions.assertThrows(NoSuchElementException.class,()->{
			HouseIngredientEntity selectedHouseIngredientEntity = houseIngredientRepository.findById(houseIngredientId).get();
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
//		System.out.println(response.getBody().getData().get("houseIngredient"));
		Assertions.assertNotNull(response.getBody().getData());
	}

	@Test
	void searchAllHouseIngredientTest(){
		//given
		String houseCode = "492f9401-c684-4966-936e-56f0941eaffe";

		//when
		ResponseEntity<Response> response = houseIngredientController.searchAll(houseCode);

		//then
		System.out.println("response = " + response);
//		System.out.println(response.getBody().getData().get("houseIngredient"));
//		Assertions.assertNotNull(response.getBody().getData());
	}

	@Test
	@Transactional
	void insertHouseIngredientTest(){
		//given
		HouseIngredientSaveAllRequest houseIngredientSaveAllRequest = HouseIngredientSaveAllRequest.builder().houseCode("492f9401-c684-4966-936e-56f0941eaffe").ingredients(new ArrayList<>()).build();
		houseIngredientSaveAllRequest.getIngredients().add(HouseIngredientDetailParam.builder().ingredientInfoId((short)14).ingredientName("감자").storageType((byte)2).lastDate(LocalDate.of(2023,10,10)).build());
//		houseIngredientSaveAllRequest.getIngredients().add(HouseIngredientDetailParam.builder().ingredientInfoId((short)-1).ingredientName("갈비만두").storageType((byte)1).build());
		//when
		ResponseEntity<Response> response = houseIngredientController.saveAll(houseIngredientSaveAllRequest);

		//then
		System.out.println("response = " + response);
//		System.out.println(response.getBody().getData().get("houseIngredient"));
//		Assertions.assertNotNull(response.getBody().getData());
	}

	@Test
	@Transactional
	void updateHouseIngredientTest(){
		//given
		int houseIngredientId = 1;
		HouseIngredientSaveRequest houseIngredientSaveRequest = HouseIngredientSaveRequest.builder().houseIngredientId(houseIngredientId).storageType((byte)2).lastDate(LocalDate.of(2023,10,10)).build();
		System.out.println(houseIngredientController.search(houseIngredientId));
		System.out.println(houseIngredientSaveRequest);


		//when
		ResponseEntity<Response> response = houseIngredientController.save(houseIngredientSaveRequest);

		//then
//		System.out.println(response);

		HouseIngredientResponse data = ((HouseIngredientResponse)houseIngredientController.search(houseIngredientId).getBody().getData().get("houseIngredient"));
//		System.out.println(data.getLastDate());
		Assertions.assertEquals(data.getLastDate().toString(),"2023-10-10");
	}

	@Test
	@Transactional
	void deleteTest(){
		//given
		int houseIngredientId = 1;

		//when
		ResponseEntity<Response> response = houseIngredientController.delete(houseIngredientId);

		//then
//		System.out.println(response);
		Assertions.assertThrows(NoHouseIngredientException.class,()->houseIngredientController.search(1));
//		System.out.println(houseIngredientController.search(1));
	}

	@Test
	@Transactional
	void deleteAllTest(){
		//given
		String houseCode = "492f9401-c684-4966-936e-56f0941eaffe";

		//when
		ResponseEntity<Response> response = houseIngredientController.deleteAll(houseCode);

		//then
//		System.out.println(response);
		Assertions.assertThrows(NoHouseIngredientException.class,()->houseIngredientController.search(1));
		Assertions.assertEquals(0,houseIngredientController.searchAll(houseCode).getBody().getData().get("count"));
	}


}
