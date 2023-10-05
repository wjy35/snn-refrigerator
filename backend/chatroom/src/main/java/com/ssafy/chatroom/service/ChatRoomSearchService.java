package com.ssafy.chatroom.service;

import com.ssafy.chatroom.db.entity.ChatRoomEntity;
import java.util.List;
import java.util.Optional;

public interface ChatRoomSearchService {
    List<ChatRoomEntity> searchByMemberId(Long memberId);
    Optional<ChatRoomEntity> searchBySharePostIdAndSenderMemberId(Integer sharePostId, Long senderMemberId);
}
