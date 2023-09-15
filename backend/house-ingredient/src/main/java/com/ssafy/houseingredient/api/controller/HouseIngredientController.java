package com.ssafy.houseingredient.api.controller;

import com.ssafy.houseingredient.api.exception.NoHouseIngredientException;
import com.ssafy.houseingredient.api.mapper.HouseIngredientMapper;
import com.ssafy.houseingredient.api.request.HouseIngredientSaveAllRequest;
import com.ssafy.houseingredient.api.response.HouseIngredientResponse;
import com.ssafy.houseingredient.api.response.Response;
import com.ssafy.houseingredient.db.entity.HouseIngredientEntity;
import com.ssafy.houseingredient.service.HouseIngredientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class HouseIngredientController {
    private final HouseIngredientService houseIngredientService;


    @GetMapping("/{houseIngredientId}")
    public ResponseEntity<Response> search(@PathVariable Integer houseIngredientId){
        HouseIngredientEntity houseIngredientEntity = houseIngredientService.searchByHouseIngredientId(houseIngredientId)
                .orElseThrow(NoHouseIngredientException::new);
        HouseIngredientResponse houseIngredientResponse = HouseIngredientMapper.INSTANCE.entityToResponse(houseIngredientEntity);
        Response response = new Response();
        response.setMessage("OK");

        // TODO : find better way
        response.addData("houseIngredient",houseIngredientResponse);
//        System.out.println(new ResponseEntity<>(response, HttpStatus.OK));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Response> saveAll(@RequestBody HouseIngredientSaveAllRequest houseIngredientSaveAllRequest){

        List<HouseIngredientEntity> houseIngredientEntities = HouseIngredientMapper.INSTANCE.saveAllRequestToEntity(houseIngredientSaveAllRequest);

        houseIngredientService.saveAll(houseIngredientEntities);

        Response response = new Response();
        response.setMessage("OK");

        response.addRequest("houseSeq", houseIngredientSaveAllRequest.getHouseSeq());
        response.addRequest("count",houseIngredientEntities.size());
        System.out.println(new ResponseEntity<>(response, HttpStatus.OK));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(value = NoHouseIngredientException.class)
    ResponseEntity<HouseIngredientResponse> handleNoHouseIngredientException(){
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}