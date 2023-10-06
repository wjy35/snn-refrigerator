package com.ssafy.share.service;

import com.ssafy.share.db.entity.ShareIngredient;
import com.ssafy.share.db.entity.SharePost;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

public interface ShareIngredientService {
    ShareIngredient findShareIngredient(Short ingredientInfoId,SharePost sharePost);
    ShareIngredient save(ShareIngredient shareIngredient);
    List<Map<String, Object>> convertIngredients(List<ShareIngredient> ingredients) throws IllegalAccessException;

    @Transactional
    void deleteBySharePost(SharePost sharePost);
}
