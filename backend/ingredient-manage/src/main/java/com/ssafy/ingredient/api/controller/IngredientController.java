package com.ssafy.ingredient.api.controller;

import com.ssafy.ingredient.api.response.IngredientInfo;
import com.ssafy.ingredient.api.exception.NoIngredientInfoException;
import com.ssafy.ingredient.api.mapper.IngredientInfoMapper;
import com.ssafy.ingredient.api.response.Response;
import com.ssafy.ingredient.db.entity.IngredientInfoEntity;
import com.ssafy.ingredient.service.IngredientInfoSearchService;
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
public class IngredientController {
    private final IngredientInfoSearchService ingredientInfoSearchService;

    @GetMapping("/{ingredientInfoId}")
    ResponseEntity<Response> search(@PathVariable Short ingredientInfoId){
        IngredientInfoEntity ingredientInfoEntity = ingredientInfoSearchService.searchByIngredientInfoId(ingredientInfoId)
                .orElseThrow(()->new NoIngredientInfoException());

        IngredientInfo ingredientInfo = IngredientInfoMapper.INSTANCE.entityToResponse(ingredientInfoEntity);
        Response response = new Response();
        response.setMessage("success");
        response.addData(ingredientInfo);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(value = NoIngredientInfoException.class)
    ResponseEntity<IngredientInfo> handleNoIngredientInfoException(){
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
