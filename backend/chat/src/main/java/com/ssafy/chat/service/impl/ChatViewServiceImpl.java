package com.ssafy.chat.service.impl;

import com.ssafy.chat.db.entity.ChatEntity;
import com.ssafy.chat.service.ChatViewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatViewServiceImpl implements ChatViewService {
    private final RedisTemplate<Integer, ChatEntity> redisTemplate;

    @Override
    public List<ChatEntity> viewAllChat(Integer chatRoomId) {
        return redisTemplate.opsForList().range(chatRoomId,0,-1);
    }

    @Override
    public ChatEntity viewCurrentChat(Integer chatRoomId) {
        return redisTemplate.opsForList().range(chatRoomId,-1,-1).get(0);
    }
}
