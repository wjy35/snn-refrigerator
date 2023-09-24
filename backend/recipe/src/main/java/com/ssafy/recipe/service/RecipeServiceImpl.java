package com.ssafy.recipe.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.recipe.api.request.RecipeDetailRequest;
import com.ssafy.recipe.api.response.*;
import com.ssafy.recipe.service.feign.MemberFeign;
import com.ssafy.recipe.api.mapper.RecipeCustomIngredientMapper;
import com.ssafy.recipe.api.mapper.RecipeDetailMapper;
import com.ssafy.recipe.api.mapper.RecipeIngredientMapper;
import com.ssafy.recipe.api.mapper.RecipeMapper;
import com.ssafy.recipe.api.request.RecipeIngredientParam;
import com.ssafy.recipe.api.request.RecipeRequest;
import com.ssafy.recipe.db.entity.*;
import com.ssafy.recipe.db.repository.*;
import com.ssafy.recipe.exception.CustomException;
import com.ssafy.recipe.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService{

    private final RecipeMapper recipeMapper;

    private final RecipeDetailMapper recipeDetailMapper;

    private final RecipeIngredientMapper recipeIngredientMapper;

    private final RecipeCustomIngredientMapper recipeCustomIngredientMapper;

    private final IngredientInfoRepository ingredientInfoRepository;

    private final RecipeRepository recipeRepository;

    private final RecipeDetailRepository recipeDetailRepository;

    private final RecipeCustomIngredientRepository recipeCustomIngredientRepository;

    private final RecipeIngredientRepository recipeIngredientRepository;

    private final RecipeSearchService recipeSearchService;

    @Override
    public void createRecipe(RecipeRequest request) {
        Recipe recipe = recipeMapper.recipeRequestToRecipe(request);

        this.saveRecipe(recipe);

        this.saveRecipeDetails(recipe, request);

        this.isCustomIngredient(recipe, request);

    }

    @Override
    public void updateRecipe(int recipeId, RecipeRequest request){
        Recipe recipe = recipeMapper.recipeRequestToRecipe(request);

        recipe.setRecipeId(recipeId);

        this.saveRecipe(recipe);

        this.updateRecipeDetails(recipe, request);

        this.updateRecipeIngredient(recipe, request);
    }

    @Override
    public void deleteRecipe(int recipeId){
        recipeRepository.deleteById(recipeId);
    }

    @Override
    public void saveRecipe(Recipe recipe){
        recipeRepository.save(recipe);
    }

    @Override
    public void updateRecipeIngredient(Recipe recipe, RecipeRequest request){
        this.deleteRecipeCustomIngredient(recipe);
        this.deleteRecipeIngredient(recipe);
        for(int i=0; i<request.getIngredients().size(); i++){
            RecipeIngredientParam recipeIngredientParam = request.getIngredients().get(i);
            if(recipeIngredientParam.getIngredientInfoId() == 0){
                this.saveRecipeCustomIngredient(recipe, recipeIngredientParam);
            }else{
                this.saveRecipeIngredient(recipe, recipeIngredientParam);
            }
        }

    }


    @Override
    public void saveRecipeDetails(Recipe recipe, RecipeRequest request){
        List<RecipeDetail> recipeDetails = recipeDetailMapper.recipeDetailParamsToRecipeDetails(request.getContents());
        for (RecipeDetail recipeDetail : recipeDetails) {
            recipeDetail.setRecipe(recipe);
        }
        recipeDetailRepository.saveAll(recipeDetails);
    }

    @Override
    public void updateRecipeDetails(Recipe recipe, RecipeRequest request){
        List<RecipeDetail> recipeDetails = recipeDetailMapper.recipeDetailParamsToRecipeDetails(request.getContents());
        List<RecipeDetail> originalRecipeDetails = recipeDetailRepository.findByRecipeRecipeId(recipe.getRecipeId());
        recipeDetailRepository.deleteAll(originalRecipeDetails);
        for (RecipeDetail recipeDetail : recipeDetails) {
            recipeDetail.setRecipe(recipe);
        }

        recipeDetailRepository.saveAll(recipeDetails);
    }

    @Override
    public void isCustomIngredient(Recipe recipe, RecipeRequest request){
        for(int i=0; i<request.getIngredients().size(); i++){
            RecipeIngredientParam recipeIngredientParam = request.getIngredients().get(i);
            if(recipeIngredientParam.getIngredientInfoId()==0){
                this.saveRecipeCustomIngredient(recipe, recipeIngredientParam);
            }else{
                this.saveRecipeIngredient(recipe, recipeIngredientParam);
            }
        }
    }

    @Override
    public void saveRecipeCustomIngredient(Recipe recipe, RecipeIngredientParam recipeIngredientParam){
        RecipeCustomIngredient recipeCustomIngredient = recipeCustomIngredientMapper.recipeIngredientParamToRecipeCustomIngredient(recipeIngredientParam);
        recipeCustomIngredient.setRecipe(recipe);
        recipeCustomIngredientRepository.save(recipeCustomIngredient);
    }

    @Override
    public void deleteRecipeCustomIngredient(Recipe recipe){
        List<RecipeCustomIngredient> recipeCustomIngredientList = recipeCustomIngredientRepository.findAllByRecipe(recipe);
        recipeCustomIngredientRepository.deleteAll(recipeCustomIngredientList);
    }

    @Override
    public void saveRecipeIngredient(Recipe recipe, RecipeIngredientParam recipeIngredientParam){
        RecipeIngredient recipeIngredient = recipeIngredientMapper.recipeIngredientParamToRecipeIngredients(recipeIngredientParam);
        recipeIngredient.setRecipe(recipe);
        Optional<IngredientInfo> ingredientInfo = ingredientInfoRepository.findById(recipeIngredientParam.getIngredientInfoId());
        recipeIngredient.setIngredientInfo(ingredientInfo.get());
        recipeIngredientRepository.save(recipeIngredient);
    }

    @Override
    public void deleteRecipeIngredient(Recipe recipe){
        List<RecipeIngredient> recipeIngredientList = recipeIngredientRepository.findAllByRecipe(recipe);
        recipeIngredientRepository.deleteAll(recipeIngredientList);
    }


    @Override
    public RecipeDetailResponse getRecipe(RecipeDetailRequest request){
        int recipeId = request.getRecipeId();
        long memberId = request.getMemberId();;
        Optional<Recipe> recipe = recipeRepository.findById(recipeId);

        if(recipe.isEmpty()) throw new CustomException(ErrorCode.NOT_FOUND_RECIPE);

        MemberResponse memberResponse = recipeSearchService.getMember(memberId);

        List<IngredientParam> ingredientParams = this.getIngredientList(memberId, recipe.get());

        List<ContentParam> recipeDetails = this.getRecipeDetail(recipeId);

        boolean isFavorite = recipeSearchService.favoriteCheck(memberId, recipeId);

        return RecipeDetailResponse.builder()
                .nickname(memberResponse.getNickname())
                .profileImageUrl(memberResponse.getProfileImageUrl())
                .title(recipe.get().getTitle())
                .image(recipe.get().getImageUrl())
                .youtubeUrl(recipe.get().getYoutubeUrl())
                .isFavorite(isFavorite)
                .favoriteCount(recipe.get().getFavoriteCount())
                .followCount((memberResponse.getFollowCount()))
                .cookingTime(recipe.get().getCookingTime())
                .foodName(recipe.get().getFoodName())
                .serving(recipe.get().getServing())
                .followCount(memberResponse.getFollowCount())
                .contentResponseList(recipeDetails)
                .ingredientResponseList(ingredientParams)
                .build();
    }



    @Override
    public List<ContentParam> getRecipeDetail(int recipeId){
        List<RecipeDetail> recipeDetails = recipeDetailRepository.findByRecipeRecipeId(recipeId);
        return recipeDetailMapper.recipeDetailsToContentParam(recipeDetails);
    }

    @Override
    public List<IngredientParam> getIngredientList(long memberId, Recipe recipe){

        // ingredientParam 리스트 생성
        List<IngredientParam> ingredientParams = new ArrayList<>();

        // 커스텀 식재료 -> 레시피 id로 여기 있는 식재료 다 검색, 양, 이름 추가
        List<RecipeCustomIngredient> recipeCustomIngredientList = recipeCustomIngredientRepository.findAllByRecipe(recipe);

        for(int i=0; i<recipeCustomIngredientList.size(); i++){
            RecipeCustomIngredient recipeCustomIngredient = recipeCustomIngredientList.get(i);

            IngredientParam ingredientParam = IngredientParam.builder()
                    .name(recipeCustomIngredient.getIngredientName())
                    .amount(recipeCustomIngredient.getAmount())
                    .build();

            ingredientParams.add(ingredientParam);
        }

        List<RecipeIngredient> recipeIngredientList = recipeIngredientRepository.findAllByRecipe(recipe);

        MemberResponse memberResponse = recipeSearchService.getMember(memberId);

        List<HouseIngredientResponse> houseIngredientResponseList = recipeSearchService.getHouseIngredientResponse(memberResponse.getHouseCode());

        for(int i=0; i<recipeIngredientList.size(); i++){
            RecipeIngredient recipeIngredient = recipeIngredientList.get(i);

            IngredientParam ingredientParam = IngredientParam.builder()
                    .name(recipeIngredient.getIngredientInfo().getIngredientName())
                    .amount(recipeIngredient.getAmount())
                    .build();


            for(int j=0; j<houseIngredientResponseList.size(); j++){
                HouseIngredientResponse houseIngredientResponse = houseIngredientResponseList.get(j);

                if(houseIngredientResponse.getIngredientInfoId() == recipeIngredient.getIngredientInfo().getIngredientInfoId()){
                    ingredientParam.setLastDate(houseIngredientResponse.getLastDate());
                }
            }

            ingredientParams.add(ingredientParam);

        }
        return ingredientParams;
    }
}
