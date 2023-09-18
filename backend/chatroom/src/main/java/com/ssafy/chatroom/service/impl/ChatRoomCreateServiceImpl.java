package com.ssafy.chatroom.service.impl;

import com.ssafy.chatroom.db.entity.ChatRoomEntity;
import com.ssafy.chatroom.db.repository.ChatRoomRepository;
import com.ssafy.chatroom.service.ChatRoomCreateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatRoomCreateServiceImpl implements ChatRoomCreateService {
    private final ChatRoomRepository chatRoomRepository;

    @Override
    public void createChatRoom(ChatRoomEntity chatRoomEntity) {
        chatRoomRepository.save(chatRoomEntity);
    }

}
