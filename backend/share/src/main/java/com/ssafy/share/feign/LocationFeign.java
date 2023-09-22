package com.ssafy.share.feign;

import com.ssafy.share.api.response.LocationResponse;
import com.ssafy.share.api.response.MemberResponse;
import com.ssafy.share.api.response.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@FeignClient(name = "address-autocomplete",url = "http://a502.store/address-autocomplete")
public interface LocationFeign {
    @GetMapping("/{locationId}")
    Response getLocationName(@PathVariable Short locationId);
}
