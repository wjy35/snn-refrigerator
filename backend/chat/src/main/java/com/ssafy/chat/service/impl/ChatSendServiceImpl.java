package com.ssafy.chat.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.chat.api.request.ChatPublish;
import com.ssafy.chat.api.response.ChatForDetailResponse;
import com.ssafy.chat.api.response.ChatForListResponse;
import com.ssafy.chat.service.ChatSendService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatSendServiceImpl implements ChatSendService {
    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @Override
    public void sendForDetail(ChatPublish chatPublish) {
        try {
            ChatForDetailResponse chatForDetailResponse = ChatForDetailResponse
                    .builder()
                    .memberId(chatPublish.getSendMemberId())
                    .content(chatPublish.getContent())
                    .timestamp(chatPublish.getTimestamp())
                    .build();

            simpMessageSendingOperations.convertAndSend(
                    chatPublish.getChatRoomDetailDestination(),
                    objectMapper.writeValueAsString(chatForDetailResponse)
            );
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void sendForList(ChatPublish chatPublish) {
        try {
            ChatForListResponse chatForListResponse = ChatForListResponse
                    .builder()
                    .chatRoomId(chatPublish.getChatRoomId())
                    .content(chatPublish.getContent())
                    .timestamp(chatPublish.getTimestamp())
                    .build();

            simpMessageSendingOperations.convertAndSend(
                    chatPublish.getChatRoomListDestination(),
                    objectMapper.writeValueAsString(chatForListResponse)
            );
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void sendForEcho(ChatPublish chatPublish) {
        try {
            ChatForDetailResponse chatForDetailResponse = ChatForDetailResponse
                    .builder()
                    .memberId(chatPublish.getSendMemberId())
                    .content(chatPublish.getContent())
                    .timestamp(chatPublish.getTimestamp())
                    .build();

            simpMessageSendingOperations.convertAndSend(
                    chatPublish.getEchoDestination(),
                    objectMapper.writeValueAsString(chatForDetailResponse)
            );
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
