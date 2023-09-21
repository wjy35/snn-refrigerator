package com.ssafy.chatroom.cloud.openfeign;

import com.ssafy.chatroom.api.response.Response;
import com.ssafy.chatroom.cloud.dto.MemberDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value="memberOpenFeign", url = "a502.store/member-manage")
public interface MemberOpenFeign {
    @GetMapping("/{memberId}")
    Response getMemberDto(@PathVariable Long memberId);
}
