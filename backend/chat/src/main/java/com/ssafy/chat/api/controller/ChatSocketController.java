package com.ssafy.chat.api.controller;

import com.ssafy.chat.api.request.ChatPayload;
import com.ssafy.chat.api.request.ChatPublish;
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

    // ToDo Refactoring + save Fail Exception 처리
    @MessageMapping("/")
    void send(@Payload ChatPayload chatPayload){
        ChatEntity chatEntity = ChatEntity
                .builder()
                .memberId(chatPayload.getSendMemberId())
                .content(chatPayload.getContent())
                .build();

        chatSaveService.save(chatPayload.getChatRoomId(), chatEntity);
        Optional.ofNullable(chatServerManageService.getChatServerIdByMemberId(chatPayload.getReceiveMemberId()))
                .ifPresent((chatServerId)->{
                    ChatPublish chatPublish = ChatPublish
                            .builder()
                            .memberId(chatPayload.getReceiveMemberId())
                            .content(chatPayload.getContent())
                            .timestamp(chatEntity.getTimestamp())
                            .build();

                    redisTemplate.convertAndSend(
                            chatServerId,
                            chatPublish
                    );
                });

        // TODO RabbitMQ 를 통해 Chat Alert Server 로 전송
    }

}
