package com.ssafy.chat.service.impl;

import com.ssafy.chat.db.entity.ChatEntity;
import com.ssafy.chat.service.ChatSaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatSaveServiceImpl implements ChatSaveService {
    private final RedisTemplate<Integer, ChatEntity> redisTemplate;

    @Override
    @Transactional
    public void save(Integer chatRoomId, ChatEntity chatEntity) {
        redisTemplate.opsForList().rightPush(chatRoomId, chatEntity);
    }
}
