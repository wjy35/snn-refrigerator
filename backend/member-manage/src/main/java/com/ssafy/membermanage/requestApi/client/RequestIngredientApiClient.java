package com.ssafy.membermanage.requestApi.client;

import com.ssafy.membermanage.requestApi.config.OpenFeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@FeignClient(name = "ingredientRequest", url = "${ingredients.server}", configuration = OpenFeignConfig.class)
public interface RequestIngredientApiClient {
    @GetMapping("/{ingredientId}")
    Map<String, Object> getIngredientName(@PathVariable("ingredientId") Short ingredientId);

}
