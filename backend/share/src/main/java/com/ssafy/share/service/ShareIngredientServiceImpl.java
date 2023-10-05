package com.ssafy.share.service;

import com.ssafy.share.db.entity.ShareIngredient;
import com.ssafy.share.db.entity.SharePost;
import com.ssafy.share.db.repository.ShareIngredientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShareIngredientServiceImpl implements ShareIngredientService{
    private final ShareIngredientRepository shareIngredientRepository;

    @Override
    public ShareIngredient save(ShareIngredient shareIngredient) {
        return shareIngredientRepository.save(shareIngredient);
    }

    @Override
    public List<Map<String, Object>> convertIngredients(List<ShareIngredient> ingredients) throws IllegalAccessException {

        List<Map<String, Object>> result = new ArrayList<>();

        for(ShareIngredient ingredient: ingredients){
            Map<String, Object> mp = new HashMap<>();
            mp.put("shareIngredientSeq", ingredient.getShareIngredientSeq());
            mp.put("ingredientInfoId", ingredient.getIngredientInfoId());
            mp.put("sharePost", ingredient.getSharePost().getSharePostId());
            mp.put("amount", ingredient.getAmount());
            result.add(mp);
        }
        return result;
    }

    @Override
    public void deleteBySharePost(SharePost sharePost){
        shareIngredientRepository.deleteBySharePost(sharePost);
    }
}
