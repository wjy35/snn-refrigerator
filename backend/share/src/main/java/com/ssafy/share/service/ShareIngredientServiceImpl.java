package com.ssafy.share.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.share.db.entity.ShareIngredient;
import com.ssafy.share.db.repository.ShareIngredientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
    public List<Map<String, Object>> convertIngredients(List<ShareIngredient> ingredients) {

        List<Map<String, Object>> result = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        for(ShareIngredient ingredient: ingredients){
            Map<String, Object> mp = objectMapper.convertValue(ingredient, HashMap.class);
            mp.remove("sharePost");
            result.add(mp);
        }
        return result;
    }
}
