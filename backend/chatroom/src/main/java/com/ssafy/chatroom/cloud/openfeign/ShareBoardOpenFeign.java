package com.ssafy.chatroom.cloud.openfeign;


import com.ssafy.chatroom.api.response.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value = "sharePostOpenFeign", url = "a502.store/share")
public interface ShareBoardOpenFeign {

    @GetMapping("/detail/{shareBoardId}")
    Response getShareBoardDto(@PathVariable Integer shareBoardId);
}
