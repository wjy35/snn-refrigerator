package com.ssafy.chat.api.controller;

import com.ssafy.chat.api.request.ChatPayload;
import com.ssafy.chat.db.entity.ChatEntity;
import com.ssafy.chat.service.ChatSaveService;
import com.ssafy.chat.service.ChatServerManageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class ChatSocketController {
    private final ChatServerManageService chatServerManageService;
    private final ChatSaveService chatSaveService;
    private final RedisTemplate<String, Object> redisTemplate;

    @SubscribeMapping("/{chatRoomId}/{memberId}")
    void enter(@DestinationVariable Integer chatRoomId,
               @DestinationVariable Long memberId,
               @Header("simpSessionId") String simpSessionId){
        chatServerManageService.enter(memberId,simpSessionId);
    }

}
