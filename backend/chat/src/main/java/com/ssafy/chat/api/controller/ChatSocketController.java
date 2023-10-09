package com.ssafy.chat.api.controller;

import com.ssafy.chat.api.request.ChatNotificationRequest;
import com.ssafy.chat.api.request.ChatPayload;
import com.ssafy.chat.api.request.ChatPublish;
import com.ssafy.chat.db.entity.ChatEntity;
import com.ssafy.chat.service.ChatSaveService;
import com.ssafy.chat.service.ChatSendService;
import com.ssafy.chat.service.ChatServerManageService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class ChatSocketController {
    private final ChatServerManageService chatServerManageService;
    private final ChatSaveService chatSaveService;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ChatSendService chatSendService;
    private final RabbitTemplate rabbitTemplate;

    // ToDo Refactoring + save Fail Exception 처리
    @MessageMapping("/")
    void send(@Payload ChatPayload chatPayload){
        ChatEntity chatEntity = ChatEntity
                .builder()
                .memberId(chatPayload.getSendMemberId())
                .content(chatPayload.getContent())
                .build();
        if(!chatPayload.getContent().equals("")){
            chatSaveService.save(chatPayload.getChatRoomId(), chatEntity);
        }

        ChatPublish chatPublish = ChatPublish
                .builder()
                .chatRoomId(chatPayload.getChatRoomId())
                .sendMemberId(chatPayload.getSendMemberId())
                .receiveMemberId(chatPayload.getReceiveMemberId())
                .content(chatPayload.getContent())
                .timestamp(chatEntity.getTimestamp())
                .build();
        chatSendService.sendForEcho(chatPublish);

        Optional.ofNullable(chatServerManageService.getChatServerIdByMemberId(chatPayload.getReceiveMemberId()))
                .ifPresentOrElse((chatServerId)->{
                    redisTemplate.convertAndSend(
                            chatServerId,
                            chatPublish
                    );
               }
                ,()->{
                    if(!chatPayload.getContent().equals("")){
                        rabbitTemplate.convertAndSend(
                                "chat-exchange",
                                "chat-id.*",
                                ChatNotificationRequest
                                        .builder()
                                        .receiveMemberId(chatPayload.getReceiveMemberId())
                                        .content(chatPayload.getContent())
                                        .sendMemberId(chatPayload.getSendMemberId())
                                        .build()
                        );
                    }
                });
    }

}
