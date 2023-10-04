package com.ssafy.share.service;

import com.ssafy.share.db.entity.ShareIngredient;

import java.util.List;
import java.util.Map;

public interface ShareIngredientService {
    ShareIngredient save(ShareIngredient shareIngredient);
    List<Map<String, Object>> convertIngredients(List<ShareIngredient> ingredients);
}
