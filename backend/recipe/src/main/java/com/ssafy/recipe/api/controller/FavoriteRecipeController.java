package com.ssafy.recipe.api.controller;

import com.ssafy.recipe.api.request.MemberIdRequest;
import com.ssafy.recipe.api.request.RecipeRequest;
import com.ssafy.recipe.api.response.RecipeSearchResponse;
import com.ssafy.recipe.api.response.Response;
import com.ssafy.recipe.service.FavoriteRecipeServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/favorite")
public class FavoriteRecipeController {

    private final FavoriteRecipeServiceImpl favoriteRecipeService;

    @PostMapping("/{recipeId}")
    public ResponseEntity<?> addFavoriteRecipe (@PathVariable int recipeId, @RequestBody MemberIdRequest memberId) {
        Response response = new Response();
        favoriteRecipeService.addFavoriteRecipe(recipeId, memberId.getMemberId());
        response.setMessage("OK");
        response.addRequest("recipeId",recipeId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<?> deleteFavoriteRecipe (@PathVariable int recipeId, @RequestBody MemberIdRequest memberId){
        Response response = new Response();
        favoriteRecipeService.deleteFavoriteRecipe(recipeId, memberId.getMemberId());
        response.setMessage("OK");
        response.addRequest("recipeId",recipeId);
        response.addRequest("memberId",memberId.getMemberId());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<?> getFavoriteRecipe (@PathVariable long memberId, Pageable pageable){
        Response response = new Response();
        List<RecipeSearchResponse> recipeSearchResponseList = favoriteRecipeService.getFavoriteResponse(memberId, pageable);
        long count = favoriteRecipeService.getCount(memberId);
        response.setMessage("OK");
        response.addRequest("memberId",memberId);
        response.addData("totPage", (int)Math.ceil((double)count/ pageable.getPageSize()));
        response.addData("totCount", count);
        response.addData("recipe", recipeSearchResponseList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
