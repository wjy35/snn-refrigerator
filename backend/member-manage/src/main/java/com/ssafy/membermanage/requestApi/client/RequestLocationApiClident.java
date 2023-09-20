package com.ssafy.membermanage.requestApi.client;

import com.ssafy.membermanage.requestApi.config.OpenFeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@FeignClient(name = "locationRequest", url = "${location.server}", configuration = OpenFeignConfig.class)
public interface RequestLocationApiClident {
    @GetMapping("/{locationId}")
    Map<String, Object> getLocationName(@PathVariable("locationId") Short locationId);
}
