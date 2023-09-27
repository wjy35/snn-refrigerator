package com.ssafy.recipe.api.controller;

import com.ssafy.recipe.api.request.RecipeDetailRequest;
import com.ssafy.recipe.api.request.RecipeRequest;
import com.ssafy.recipe.api.response.RecipeDetailResponse;
import com.ssafy.recipe.api.response.Response;
import com.ssafy.recipe.s3.util.S3helper;
import com.ssafy.recipe.service.RecipeServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeServiceImpl recipeService;

    private final S3helper s3helper;
    @PostMapping(value = "/")
    public ResponseEntity<?> createRecipe (@RequestBody RecipeRequest recipeRequest) throws IOException {
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

    @PostMapping("/image/{memberId}")
    public ResponseEntity<?> testImagePost(@PathVariable String memberId, @RequestPart(value = "recipeImage",required = false) MultipartFile recipeImage) throws Exception{
        Response response = new Response();
        String fileName = s3helper.upload("recipe", String.valueOf(memberId), recipeImage);
        String file = s3helper.getS3ImageUrl(fileName);
        response.setMessage("OK");
        response.addData("imageUrl", file);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
