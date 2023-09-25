package com.ssafy.chatroom.service;

import com.ssafy.chatroom.db.entity.ChatRoomEntity;
import java.util.List;

public interface ChatRoomSearchService {
    List<ChatRoomEntity> searchByMemberId(Long memberId);
    ChatRoomEntity searchBySharePostIdAndSenderMemberId(Integer sharePostId, Long senderMemberId);
}
