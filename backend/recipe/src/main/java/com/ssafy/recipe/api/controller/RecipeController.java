package com.ssafy.recipe.api.controller;

import com.ssafy.recipe.api.request.RecipeDetailRequest;
import com.ssafy.recipe.api.request.RecipeRequest;
import com.ssafy.recipe.api.response.RecipeDetailResponse;
import com.ssafy.recipe.api.response.Response;
import com.ssafy.recipe.service.RecipeServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeServiceImpl recipeService;

    @PostMapping("/")
    public ResponseEntity<?> createRecipe (@RequestBody RecipeRequest recipeRequest) {
        Response response = new Response();
        recipeService.createRecipe(recipeRequest);
        response.setMessage("OK");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{recipeId}")
    public ResponseEntity<?> updateRecipe (@PathVariable int recipeId, @RequestBody RecipeRequest recipeRequest){
        Response response = new Response();
        recipeService.updateRecipe(recipeId, recipeRequest);
        response.setMessage("OK");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<?> deleteRecipe (@PathVariable int recipeId){
        Response response = new Response();
        recipeService.deleteRecipe((recipeId));
        response.setMessage("OK");
        response.addRequest("recipeId", recipeId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/recipe")
    public ResponseEntity<?> getRecipeDetail(@RequestBody RecipeDetailRequest request){
        Response response = new Response();
        RecipeDetailResponse recipeDetailResponse = recipeService.getRecipe(request);
        response.addRequest("recipeId", request.getRecipeId());
        response.setMessage("OK");
        response.addData("recipeInfo", recipeDetailResponse);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}