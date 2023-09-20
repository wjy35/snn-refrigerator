package com.ssafy.chatroom.cloud.openfeign;


import com.ssafy.chatroom.api.response.Response;
import com.ssafy.chatroom.cloud.dto.SharePostDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value = "sharePostOpenFeign", url = "a502.store/share")
public interface SharePostOpenFeign {

    @GetMapping("/{sharePostId}")
    Response getSharePostDto(@PathVariable Integer sharePostId);
}
