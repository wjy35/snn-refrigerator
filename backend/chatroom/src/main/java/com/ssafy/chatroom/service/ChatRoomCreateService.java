package com.ssafy.chatroom.service;

import com.ssafy.chatroom.db.entity.ChatRoomEntity;

public interface ChatRoomCreateService {
    Integer createChatRoom(ChatRoomEntity chatRoomEntity);
}
