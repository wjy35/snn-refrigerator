package com.ssafy.recipe.api.controller;

import com.ssafy.recipe.api.request.RecipeRequest;
import com.ssafy.recipe.api.request.RecipeSearchMemberRequest;
import com.ssafy.recipe.api.request.RecipeSearchRequest;
import com.ssafy.recipe.api.response.RecipeSearchResponse;
import com.ssafy.recipe.api.response.Response;
import com.ssafy.recipe.db.entity.IngredientInfo;
import com.ssafy.recipe.service.RecipeSearchService;
import com.ssafy.recipe.service.RecipeServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
public class RecipeSearchController {

    private final RecipeSearchService recipeSearchService;

    @PostMapping("/")
    public ResponseEntity<?> getAllRecipe (@RequestBody RecipeSearchRequest recipeSearchRequest) {
        Response response  = recipeSearchService.getSearchRecipe(recipeSearchRequest);
        response.setMessage("OK");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/member")
    public ResponseEntity<?> getMemberRecipe (@RequestBody RecipeSearchMemberRequest recipeSearchMemberRequest) {
        Response response  = recipeSearchService.getMemberRecipe(recipeSearchMemberRequest);
        response.setMessage("OK");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
