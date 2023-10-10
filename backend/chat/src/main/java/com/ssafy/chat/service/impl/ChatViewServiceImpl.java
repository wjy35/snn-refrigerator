package com.ssafy.chat.service.impl;

import com.ssafy.chat.db.entity.ChatEntity;
import com.ssafy.chat.service.ChatViewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatViewServiceImpl implements ChatViewService {
    private final RedisTemplate<Integer, ChatEntity> messageRedisTemplate;

    @Override
    public List<ChatEntity> viewAllChat(Integer chatRoomId) {
        return messageRedisTemplate.opsForList().range(chatRoomId,0,-1);
    }

    @Override
    public ChatEntity viewCurrentChat(Integer chatRoomId) {
        List<ChatEntity> chatEntityList = messageRedisTemplate.opsForList().range(chatRoomId,-1,-1);
        if(chatEntityList.isEmpty()){
            return ChatEntity
                    .builder()
                    .content("채팅이 시작되었습니다!")
                    .timestamp(new Timestamp(System.currentTimeMillis()))
                    .build();
        }
        return messageRedisTemplate.opsForList().range(chatRoomId,-1,-1).get(0);
    }
}
