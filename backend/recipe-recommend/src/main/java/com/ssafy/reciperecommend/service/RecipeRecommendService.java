package com.ssafy.reciperecommend.service;

import com.ssafy.reciperecommend.api.response.RecipeRecommendResponse;
import com.ssafy.reciperecommend.db.entity.Recipe;

import java.util.List;

public interface RecipeRecommendService {
    List<RecipeRecommendResponse> getRecipeRecommend(long memberId);
}
