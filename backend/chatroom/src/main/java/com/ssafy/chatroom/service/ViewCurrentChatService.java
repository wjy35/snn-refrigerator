package com.ssafy.chatroom.service;

import com.ssafy.chatroom.cloud.dto.ChatDto;

public interface ViewCurrentChatService {
    ChatDto viewByChatRoomId(Integer chatRoomId);
}
