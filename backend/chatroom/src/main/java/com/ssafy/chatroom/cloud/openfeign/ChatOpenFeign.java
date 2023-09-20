package com.ssafy.chatroom.cloud.openfeign;

import com.ssafy.chatroom.api.response.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value="chatOpenFeign", url = "a502.store/chat")
public interface ChatOpenFeign {

    @GetMapping("/{chatRoomId}")
    Response getChatDto(@PathVariable Integer chatRoomId);
}
