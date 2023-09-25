package com.ssafy.reciperecommend.service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

   @FeignClient(name = "house-ingredient",url = "http://a502.store/house-ingredient")
   public interface HouseIngredientFeign {
       @GetMapping("/house/{houseCode}")
       String getHouseIngredient(@PathVariable String houseCode);
   }
