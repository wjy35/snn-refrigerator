package com.ssafy.reciperecommend.service.feign;


import com.ssafy.reciperecommend.api.response.IngredientResponse;
import com.ssafy.reciperecommend.api.response.MemberResponse;
import com.ssafy.reciperecommend.api.response.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;


@FeignClient(name = "member-manage",url = "http://a502.store/member-manage")
public interface MemberFeign {

    @GetMapping("/{memberId}")
    Response getMemberDetail(@PathVariable Long memberId);

    @GetMapping("/{memberId}/hate-ingredient")
    String getHateIngredient(@PathVariable long memberId);
}
