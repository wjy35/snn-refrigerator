package com.ssafy.chatroom.service.impl;

import com.ssafy.chatroom.db.entity.ChatRoomEntity;
import com.ssafy.chatroom.db.entity.ShareStatusEntity;
import com.ssafy.chatroom.db.repository.ChatRoomRepository;
import com.ssafy.chatroom.db.repository.ShareStatusRepository;
import com.ssafy.chatroom.service.ChatRoomCreateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatRoomCreateServiceImpl implements ChatRoomCreateService {
    private final ChatRoomRepository chatRoomRepository;
    private final ShareStatusRepository shareStatusRepository;

    @Override
    public Integer createAndGetChatRoomEntity(ChatRoomEntity chatRoomEntity) {
        Integer chatRoomId = chatRoomRepository.save(chatRoomEntity).getChatRoomId();

        shareStatusRepository.save(
                ShareStatusEntity
                .builder()
                .chatRoomId(chatRoomId)
                .memberId(chatRoomEntity.getSenderMemberId())
                .build()
        );

        shareStatusRepository.save(
                ShareStatusEntity
                        .builder()
                        .chatRoomId(chatRoomId)
                        .memberId(chatRoomEntity.getReceiverMemberId())
                        .build()
        );

        return chatRoomId;
    }

}
