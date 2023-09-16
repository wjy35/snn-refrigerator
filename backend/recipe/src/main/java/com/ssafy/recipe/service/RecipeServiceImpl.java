package com.ssafy.recipe.service;

import com.ssafy.recipe.service.feign.MemberFeign;
import com.ssafy.recipe.api.mapper.RecipeCustomIngredientMapper;
import com.ssafy.recipe.api.mapper.RecipeDetailMapper;
import com.ssafy.recipe.api.mapper.RecipeIngredientMapper;
import com.ssafy.recipe.api.mapper.RecipeMapper;
import com.ssafy.recipe.api.request.RecipeIngredientParam;
import com.ssafy.recipe.api.request.RecipeRequest;
import com.ssafy.recipe.api.response.MemberResponse;
import com.ssafy.recipe.api.response.RecipeDetailResponse;
import com.ssafy.recipe.db.entity.*;
import com.ssafy.recipe.db.repository.*;
import com.ssafy.recipe.exception.CustomException;
import com.ssafy.recipe.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    private final MemberFeign memberFeign;


    @Override
    public void createRecipe(RecipeRequest request) {
        Recipe recipe = recipeMapper.recipeRequestToRecipe(request);

        this.saveRecipe(recipe);

        this.saveRecipeDetails(recipe, request);

        this.isCustomIngredient(recipe, request);

    }

    public void updateRecipe(int recipeId, RecipeRequest request){
        Recipe recipe = recipeMapper.recipeRequestToRecipe(request);

        recipe.setRecipeId(recipeId);

        recipeRepository.save(recipe);

        List<RecipeDetail> recipeDetails = recipeDetailMapper.contentsToRecipeDetails(request.getContent());

        List<RecipeDetail> originalRecipeDetails = recipeDetailRepository.findByRecipeRecipeId(recipeId);

        recipeDetailRepository.deleteAll(originalRecipeDetails);

        for (RecipeDetail recipeDetail : recipeDetails) {
            recipeDetail.setRecipe(recipe);
        }

        recipeDetailRepository.saveAll(recipeDetails);
    }

    public void saveRecipe(Recipe recipe){
        recipeRepository.save(recipe);
    }

    public void saveRecipeDetails(Recipe recipe, RecipeRequest request){
        List<RecipeDetail> recipeDetails = recipeDetailMapper.contentsToRecipeDetails(request.getContent());
        System.out.println(request.getContent().size());
        System.out.println(recipeDetails.get(0).getContent());
        for (RecipeDetail recipeDetail : recipeDetails) {
            recipeDetail.setRecipe(recipe);
        }
        recipeDetailRepository.saveAll(recipeDetails);
    }

    public void isCustomIngredient(Recipe recipe, RecipeRequest request){
        for(int i=0; i<request.getIngredients().size(); i++){
            RecipeIngredientParam recipeIngredientParam = request.getIngredients().get(i);
            if(recipeIngredientParam.getIngredientInfoId()==-1){
                this.saveRecipeCustomIngredient(recipe, recipeIngredientParam);
            }else{
                this.saveRecipeIngredient(recipe, recipeIngredientParam);
            }
        }
    }

    public void saveRecipeCustomIngredient(Recipe recipe, RecipeIngredientParam recipeIngredientParam){
        RecipeCustomIngredient recipeCustomIngredient = recipeCustomIngredientMapper.recipeIngredientParamToRecipeCustomIngredient(recipeIngredientParam);
        recipeCustomIngredient.setRecipe(recipe);
        recipeCustomIngredientRepository.save(recipeCustomIngredient);
    }

    public void saveRecipeIngredient(Recipe recipe, RecipeIngredientParam recipeIngredientParam){
        RecipeIngredient recipeIngredient = recipeIngredientMapper.recipeIngredientParamToRecipeIngredients(recipeIngredientParam);
        recipeIngredient.setRecipe(recipe);
        Optional<IngredientInfo> ingredientInfo = ingredientInfoRepository.findById(recipeIngredientParam.getIngredientInfoId());
        recipeIngredient.setIngredientInfo(ingredientInfo.get());
        recipeIngredientRepository.save(recipeIngredient);
    }

    public MemberResponse getMember(Long memberId){
        Optional<MemberResponse> memberResponse = memberFeign.getMemberDetail(memberId);

        if(memberResponse.isPresent()){
            return memberResponse.get();
        }else{
           throw new CustomException(ErrorCode.NOT_FOUND_MEMBER);
        }
    }

    public RecipeDetailResponse getRecipeDetail(int recipeId){
        Optional<Recipe> recipe = recipeRepository.findById(recipeId);

        String memberNickname = "";
        if(recipe.isPresent()){
            memberNickname = getMember(recipe.get().getMemberId()).getNickname();



        }else{
            throw new CustomException(ErrorCode.NOT_FOUND_RECIPE);
        }
        return null;
    }
}
