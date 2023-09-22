package com.ssafy.ingredient.api.controller;

import com.ssafy.ingredient.api.response.IngredientInfoResponse;
import com.ssafy.ingredient.api.exception.NoIngredientInfoException;
import com.ssafy.ingredient.api.mapper.IngredientInfoMapper;
import com.ssafy.ingredient.api.response.Response;
import com.ssafy.ingredient.db.entity.IngredientInfoEntity;
import com.ssafy.ingredient.service.IngredientInfoSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
public class IngredientController {
    private final IngredientInfoSearchService ingredientInfoSearchService;

    @GetMapping("/{ingredientInfoId}")
    ResponseEntity search(@PathVariable Short ingredientInfoId){
        IngredientInfoEntity ingredientInfoEntity = ingredientInfoSearchService.searchByIngredientInfoId(ingredientInfoId)
                .orElseThrow(()->new NoIngredientInfoException());

        IngredientInfoResponse ingredientInfoResponse = IngredientInfoMapper.INSTANCE.entityToResponse(ingredientInfoEntity);
        Response response = Response
                .builder()
                .message("ok")
                .response("ingredientInfo", ingredientInfoResponse)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(value = NoIngredientInfoException.class)
    ResponseEntity<IngredientInfoResponse> handleNoIngredientInfoException(){
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}