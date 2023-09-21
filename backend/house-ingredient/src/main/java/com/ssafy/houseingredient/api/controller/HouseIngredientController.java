package com.ssafy.houseingredient.api.controller;

import com.ssafy.houseingredient.api.exception.NoHouseIngredientException;
import com.ssafy.houseingredient.api.mapper.HouseIngredientMapper;
import com.ssafy.houseingredient.api.request.HouseIngredientSaveAllRequest;
import com.ssafy.houseingredient.api.request.HouseIngredientSaveRequest;
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
        HouseIngredientEntity houseIngredientEntity = houseIngredientService.searchById(houseIngredientId)
                .orElseThrow(NoHouseIngredientException::new);
        HouseIngredientResponse houseIngredientResponse = HouseIngredientMapper.INSTANCE.entityToResponse(houseIngredientEntity);
        Response response = new Response();
        response.setMessage("OK");

        response.addData("houseIngredient",houseIngredientResponse);
//        System.out.println(new ResponseEntity<>(response, HttpStatus.OK));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Response> saveAll(@RequestBody HouseIngredientSaveAllRequest houseIngredientSaveAllRequest){

        List<HouseIngredientEntity> houseIngredientEntities = HouseIngredientMapper.INSTANCE.saveAllRequestToEntity(houseIngredientSaveAllRequest.getIngredients());

        for(HouseIngredientEntity houseIngredientEntity : houseIngredientEntities){
            houseIngredientEntity.setHouseCode(houseIngredientSaveAllRequest.getHouseCode());
        }
//        System.out.println(houseIngredientEntities);

        houseIngredientService.saveAll(houseIngredientEntities);

        Response response = new Response();
        response.setMessage("OK");

        response.addRequest("houseCode", houseIngredientSaveAllRequest.getHouseCode());
        response.addRequest("count",houseIngredientEntities.size());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<Response> save(@RequestBody HouseIngredientSaveRequest houseIngredientSaveRequest){
//        HouseIngredientEntity houseIngredientEntity = HouseIngredientMapper.INSTANCE.saveRequestToEntity(houseIngredientSaveRequest);
        HouseIngredientEntity houseIngredientEntity = houseIngredientService.searchById(houseIngredientSaveRequest.getHouseIngredientId())
                .orElseThrow(NoHouseIngredientException::new);

        if(houseIngredientSaveRequest.getLastDate()!=null)  houseIngredientEntity.setLastDate(houseIngredientSaveRequest.getLastDate());
        if(houseIngredientSaveRequest.getStorageType()!=null) houseIngredientEntity.setStorageType(houseIngredientSaveRequest.getStorageType());

        houseIngredientService.save(houseIngredientEntity);

        Response response = new Response();
        response.setMessage("OK");

        response.addRequest("houseIngredientId", houseIngredientSaveRequest.getHouseIngredientId());
        response.addRequest("storageType",houseIngredientSaveRequest.getStorageType());
        response.addRequest("lastDate",houseIngredientSaveRequest.getLastDate());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/house/{houseCode}")
    public ResponseEntity<Response> searchAll(@PathVariable String houseCode){

//        HouseIngredientResponse houseIngredientResponse = HouseIngredientMapper.INSTANCE.entityToResponse(houseIngredientEntity);
        List<HouseIngredientResponse> houseIngredientResponses = HouseIngredientMapper.INSTANCE.entityToResponse(houseIngredientService.searchAllByHouseCode(houseCode));
        Response response = new Response();
        response.setMessage("OK");

        response.addRequest("houseCode",houseCode);
        response.addData("count",houseIngredientResponses.size());
        response.addData("ingredients",houseIngredientResponses);
//        System.out.println(new ResponseEntity<>(response, HttpStatus.OK));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{houseIngredientId}")
    public ResponseEntity<Response> delete(@PathVariable Integer houseIngredientId){
        houseIngredientService.deleteById(houseIngredientId);

        Response response = new Response();
        response.setMessage("OK");

        response.addRequest("houseIngredientId",houseIngredientId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/house/{houseCode}")
    public ResponseEntity<Response> deleteAll(@PathVariable String houseCode){
        houseIngredientService.deleteAllByHouseCode(houseCode);

        Response response = new Response();
        response.setMessage("OK");

        response.addRequest("houseCode",houseCode);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(value = NoHouseIngredientException.class)
    ResponseEntity<HouseIngredientResponse> handleNoHouseIngredientException(){
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
