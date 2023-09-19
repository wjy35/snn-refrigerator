package com.ssafy.chatroom.cloud.openfeign;

import com.ssafy.chatroom.cloud.dto.ChatDto;
import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(value="chatOpenFeign", url = "a502.store/chat")
public interface ChatOpenFeign {
    ChatDto getChatDto(Integer chatRoomId);
}
