package com.ssafy.recipe.api.controller;

import com.ssafy.recipe.api.request.RecipeRequest;
import com.ssafy.recipe.api.response.RecipeDetailResponse;
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
@Slf4j
public class RecipeController {

    private final RecipeServiceImpl recipeService;

    @GetMapping("")
    public String welcome(){
        return "recipe service.";
    }

    @PostMapping("/")
    public ResponseEntity<?> createRecipe (@RequestBody RecipeRequest recipeRequest) {
        Map<String, Object> resultMap = new HashMap<>();
        recipeService.createRecipe(recipeRequest);
        resultMap.put("message", "OK");

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @PutMapping("/{recipeId}")
    public ResponseEntity<?> updateRecipe (@PathVariable int recipeId, @RequestBody RecipeRequest recipeRequest){
        Map<String, Object> resultMap = new HashMap<>();
        recipeService.updateRecipe(recipeId, recipeRequest);
        resultMap.put("message", "OK");

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    
}