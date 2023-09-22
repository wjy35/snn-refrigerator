package com.ssafy.addressautocomplete;

import com.ssafy.addressautocomplete.api.controller.AddressAutocompleteController;
import com.ssafy.addressautocomplete.api.response.LocationInfoResponse;
import com.ssafy.addressautocomplete.api.response.Response;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import java.util.List;

@SpringBootTest
class AddressAutocompleteApplicationTests {

	@Autowired
	private AddressAutocompleteController addressAutocompleteController;

	@Test
	void contextLoads() {
	}

	@Test
	void searchTest(){
		//given
		Short locationId = 3;
		//when
		ResponseEntity<Response> responseEntity = addressAutocompleteController.search(locationId);

		//then
//		System.out.println(responseEntity);
		Assertions.assertEquals("강원도 강릉시 경포동",responseEntity.getBody().getData().get("locationName"));
	}

	@Test
	void containsTest(){
		//given
		String keyword = "화도";

		//when
		ResponseEntity<Response> responseEntity = addressAutocompleteController.contains(keyword);


		//then
		List<LocationInfoResponse> locationInfoResponses = (List)responseEntity.getBody().getData().get("locations");
//		System.out.println(locationInfoResponses);
		Assertions.assertEquals(4,locationInfoResponses.size());

	}

}
