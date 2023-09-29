package com.ssafy.recipe.service;

import com.ssafy.recipe.api.response.MemberResponse;
import com.ssafy.recipe.api.response.RecipeSearchResponse;
import com.ssafy.recipe.db.entity.FavoriteRecipe;
import com.ssafy.recipe.db.entity.Recipe;
import com.ssafy.recipe.db.repository.FavoriteRecipeRepository;
import com.ssafy.recipe.db.repository.RecipeRepository;
import com.ssafy.recipe.exception.CustomException;
import com.ssafy.recipe.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoriteRecipeServiceImpl implements FavoriteRecipeService {

    private final FavoriteRecipeRepository favoriteRecipeRepository;

    private final RecipeRepository recipeRepository;

    private final RecipeSearchService recipeSearchService;

    @Override
    public void addFavoriteRecipe(int recipeId, long memberId) {

        Optional<Recipe> recipe = recipeRepository.findById(recipeId);

        if(recipe.isEmpty()) throw new CustomException(ErrorCode.NOT_FOUND_RECIPE);

        int favoriteCount = recipe.get().getFavoriteCount();

        recipe.get().setFavoriteCount(favoriteCount+1);

        FavoriteRecipe favoriteRecipe = FavoriteRecipe.builder()
                .recipe(recipe.get())
                .memberId(memberId)
                .build();

        recipeRepository.save(recipe.get());
        favoriteRecipeRepository.save(favoriteRecipe);
    }

    @Override
    public void deleteFavoriteRecipe(int recipeId, long memberId) {
        Optional<FavoriteRecipe> favoriteRecipe = favoriteRecipeRepository.findByRecipeRecipeIdAndMemberId(recipeId, memberId);

        if(favoriteRecipe.isEmpty()) throw new CustomException(ErrorCode.NOT_FOUND_RECIPE);

        favoriteRecipeRepository.delete(favoriteRecipe.get());
    }

    public List<RecipeSearchResponse> getFavoriteResponse(long memberId, Pageable pageable){
        pageable = PageRequest.of(pageable.getPageNumber()-1, pageable.getPageSize());
        List<FavoriteRecipe> favoriteRecipeList = favoriteRecipeRepository.findAllByMemberId(memberId, pageable);
        List<RecipeSearchResponse> result = new ArrayList<>();

        MemberResponse memberResponse =  recipeSearchService.getMember(memberId);

        for (FavoriteRecipe favoriteRecipe : favoriteRecipeList) {
            Recipe recipe = favoriteRecipe.getRecipe();

            int myIngredients = recipeSearchService.getMyIngredientCnt(recipe, memberResponse.getHouseCode());

            int neededIngredients = recipeSearchService.getNeededIngredientsCnt(recipe);

            boolean isFavorite = recipeSearchService.favoriteCheck(memberId, recipe.getRecipeId());

            RecipeSearchResponse recipeSearchResponse = RecipeSearchResponse.builder()
                    .recipeId(recipe.getRecipeId())
                    .title(recipe.getTitle())
                    .nickname(memberResponse.getNickname())
                    .profileImageUrl(memberResponse.getProfileImageUrl())
                    .imageUrl(recipe.getImageUrl())
                    .cookingTime(recipe.getCookingTime())
                    .serving(recipe.getServing())
                    .favoriteCount(recipe.getFavoriteCount())
                    .foodName(recipe.getFoodName())
                    .isFavorite(isFavorite)
                    .followCount(memberResponse.getFollowCount())
                    .neededIngredients(neededIngredients)
                    .myIngredients(myIngredients)
                    .build();

            result.add(recipeSearchResponse);
        }
        return result;
    }

    public long getCount(long memberId){
        return favoriteRecipeRepository.countAllByMemberId(memberId);
    }



}
