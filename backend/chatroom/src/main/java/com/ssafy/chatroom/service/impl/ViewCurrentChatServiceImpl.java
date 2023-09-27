package com.ssafy.chatroom.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.chatroom.cloud.dto.ChatDto;
import com.ssafy.chatroom.cloud.openfeign.ChatOpenFeign;
import com.ssafy.chatroom.service.ViewCurrentChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ViewCurrentChatServiceImpl implements ViewCurrentChatService {
    private final ChatOpenFeign chatOpenFeign;
    private final ObjectMapper objectMapper;

    @Override
    public ChatDto viewByChatRoomId(Integer chatRoomId) {
        return objectMapper.convertValue(
                chatOpenFeign.getChatDto(chatRoomId).getData().get("chat"),
                ChatDto.class);
    }
}
