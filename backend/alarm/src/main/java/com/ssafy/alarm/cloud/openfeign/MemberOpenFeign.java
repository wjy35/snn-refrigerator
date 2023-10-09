package com.ssafy.alarm.cloud.openfeign;


import com.ssafy.alarm.api.response.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value="memberOpenFeign", url = "a502.store/member-manage")
public interface MemberOpenFeign {
    @GetMapping("/{memberId}")
    Response getMemberDto(@PathVariable Long memberId);
}
