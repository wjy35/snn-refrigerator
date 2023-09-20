package com.ssafy.reciperecommend.api.controller;

import com.ssafy.reciperecommend.api.response.RecipeRecommendResponse;
import com.ssafy.reciperecommend.api.response.Response;
import com.ssafy.reciperecommend.service.RecipeRecommendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/recipe")
public class RecipeRecommendController {

    private final RecipeRecommendService recipeRecommendService;
    @GetMapping("/{memberId}")
    public ResponseEntity<?> getRecipeRecommend (@PathVariable long memberId) {
        Response response = new Response();
        List<RecipeRecommendResponse> recipeRecommendResponses = recipeRecommendService.getRecipeRecommend(memberId);
        response.setMessage("OK");
        response.addRequest("memberId", memberId);
        response.addData("recipe", recipeRecommendResponses);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }
}
