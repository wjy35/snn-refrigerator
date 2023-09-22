package com.ssafy.chat.api.controller;

import com.ssafy.chat.service.ChatSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatSocketController {
    private final ChatSessionService chatSessionService;

    @SubscribeMapping("/consume/{chatRoomId}/{memberId}")
    void enter(@DestinationVariable Long memberId){
        chatSessionService.enterSession(memberId);
    }

}
