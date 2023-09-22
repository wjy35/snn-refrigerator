package com.ssafy.recipe.service.feign;

import com.ssafy.recipe.api.response.HouseIngredientResponse;
import com.ssafy.recipe.api.response.MemberResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@FeignClient(name = "house-ingredient",url = "http://a502.store/house-ingredient")
public interface HouseIngredientFeign {

    @GetMapping("/house/{houseCode}")
    String getHouseIngredient(@PathVariable String houseCode);
}
