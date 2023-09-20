package com.ssafy.chat.service;

import com.ssafy.chat.db.entity.ChatEntity;
import java.util.List;

public interface ChatViewService {
    List<ChatEntity> viewAllChat(Integer chatRoomId);
    ChatEntity viewCurrentChat(Integer chatRoomId);
}
