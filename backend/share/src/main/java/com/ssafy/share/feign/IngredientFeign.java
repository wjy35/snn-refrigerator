package com.ssafy.share.feign;

import com.ssafy.share.api.response.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ingredient-manage",url = "http://a502.store/ingredient-manage")
public interface IngredientFeign {
    @GetMapping("/{ingredientInfoId}")
    Response getIngredientInfoName(@PathVariable Short ingredientInfoId);
}
