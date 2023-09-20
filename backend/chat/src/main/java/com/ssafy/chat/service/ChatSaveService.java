package com.ssafy.chat.service;

import com.ssafy.chat.db.entity.ChatEntity;

public interface ChatSaveService {
    void save(Integer chatRoomId, ChatEntity chatEntity);
}
