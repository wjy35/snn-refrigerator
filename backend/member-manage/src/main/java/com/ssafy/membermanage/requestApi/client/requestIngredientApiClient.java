package com.ssafy.membermanage.requestApi.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@FeignClient(name = "ingredientRequest", url = "${ingredients.server}")
public interface requestIngredientApiClient {
    @GetMapping("/{ingredientId}")
    Map<String, Object> getIngredientName(@PathVariable("ingredientId") Integer ingredientId);

}
