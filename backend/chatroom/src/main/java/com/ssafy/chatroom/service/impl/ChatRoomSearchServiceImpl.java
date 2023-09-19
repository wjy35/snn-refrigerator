package com.ssafy.chatroom.service.impl;

import com.ssafy.chatroom.db.entity.ChatRoomEntity;
import com.ssafy.chatroom.db.repository.ChatRoomRepository;
import com.ssafy.chatroom.service.ChatRoomSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomSearchServiceImpl implements ChatRoomSearchService {
    private final ChatRoomRepository chatRoomRepository;

    @Override
    public List<ChatRoomEntity> searchBySenderMemberId(Long senderMemberId) {
        return chatRoomRepository.findAllBySenderMemberId(senderMemberId);
    }

    @Override
    public ChatRoomEntity searchBySharePostIdAndSenderMemberId(Integer sharePostId, Long senderMemberId) {
        return chatRoomRepository.findChatRoomEntityBySharePostIdAndAndSenderMemberId(sharePostId, senderMemberId).get();
    }
}
