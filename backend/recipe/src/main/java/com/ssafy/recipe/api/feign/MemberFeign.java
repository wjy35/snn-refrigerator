package com.ssafy.recipe.api.feign;

import com.ssafy.recipe.api.response.MemberResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@FeignClient(name = "ssibal",url = "http://a502.store/member-manage")
public interface MemberFeign {

    @GetMapping("/{memberId}")
    public Optional<MemberResponse> getMemberDetail(@PathVariable long memberId);
}
