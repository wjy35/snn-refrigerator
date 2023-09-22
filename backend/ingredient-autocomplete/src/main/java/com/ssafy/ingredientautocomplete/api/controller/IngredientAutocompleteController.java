package com.ssafy.ingredientautocomplete.api.controller;

import com.ssafy.ingredientautocomplete.api.mapper.IngredientAutocompleteMapper;
import com.ssafy.ingredientautocomplete.api.response.IngredientAutocompleteResponse;
import com.ssafy.ingredientautocomplete.api.response.Response;
import com.ssafy.ingredientautocomplete.db.entity.IngredientInfoEntity;
import com.ssafy.ingredientautocomplete.service.IngredientAutocompleteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class IngredientAutocompleteController {
    private final IngredientAutocompleteService ingredientAutocompleteService;

    @GetMapping("/{keyword}")
    public ResponseEntity<Response> search(@PathVariable String keyword){
        List<IngredientInfoEntity> ingredientInfoEntities = ingredientAutocompleteService.startWith(keyword);
        List<IngredientAutocompleteResponse> ingredientAutocompleteResponses = IngredientAutocompleteMapper.INSTANCE.entityToResponse(ingredientInfoEntities);

        Response response = new Response();
        response.addRequest("keyword",keyword);
        response.setMessage("OK");
        response.addData("ingredients",ingredientAutocompleteResponses);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
