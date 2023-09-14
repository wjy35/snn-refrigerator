package com.ssafy.houseingredient.api.controller;

import com.ssafy.houseingredient.api.exception.NoHouseIngredientException;
import com.ssafy.houseingredient.api.mapper.HouseIngredientMapper;
import com.ssafy.houseingredient.api.response.HouseIngredient;
import com.ssafy.houseingredient.api.response.Response;
import com.ssafy.houseingredient.db.entity.HouseIngredientEntity;
import com.ssafy.houseingredient.service.HouseIngredientSearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class HouseIngredientController {
    private final HouseIngredientSearchService houseIngredientSearchService;

    @GetMapping("/{houseIngredientId}")
    ResponseEntity<Response> search(@PathVariable Integer houseIngredientId){
        HouseIngredientEntity houseIngredientEntity = houseIngredientSearchService.searchByHouseIngredientId(houseIngredientId)
                .orElseThrow(NoHouseIngredientException::new);
        HouseIngredient houseIngredient = HouseIngredientMapper.INSTANCE.entityToResponse(houseIngredientEntity);
        Response response = new Response();
        response.setMessage("OK");
        response.addData(houseIngredient);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(value = NoHouseIngredientException.class)
    ResponseEntity<HouseIngredient> handleNoHouseIngredientException(){
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
