package com.ssafy.share.feign;


import com.ssafy.share.api.response.MemberResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@FeignClient(name = "member-manage",url = "http://a502.store/member-manage")
public interface MemberFeign {
    @GetMapping("/{memberId}")
    Optional<MemberResponse> getMemberDetail(@PathVariable Long memberId);

}
