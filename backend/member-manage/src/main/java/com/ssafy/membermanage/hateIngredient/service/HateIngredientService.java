package com.ssafy.membermanage.hateIngredient.service;

import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.requestApi.client.RequestIngredientApiClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class HateIngredientService {

    @Autowired
    private RequestIngredientApiClient requestIngredientApiClient;
    public String ingredientName(Short id){
        try{
            Map<String, Object> response = requestIngredientApiClient.getIngredientName(id);
            return (String) response.get("ingredientName");
        } catch (Exception e){
            throw new CustomException(ErrorCode.No_Such_Ingredient);
        }
    }
}
