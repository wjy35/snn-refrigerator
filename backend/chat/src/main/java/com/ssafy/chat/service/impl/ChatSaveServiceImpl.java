package com.ssafy.chat.service.impl;

import com.ssafy.chat.db.entity.ChatEntity;
import com.ssafy.chat.service.ChatSaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChatSaveServiceImpl implements ChatSaveService {
    private final RedisTemplate<Integer, ChatEntity> messageRedisTemplate;

    @Autowired
    public ChatSaveServiceImpl(RedisTemplate<Integer, ChatEntity> messageRedisTemplate) {
        this.messageRedisTemplate = messageRedisTemplate;
    }

    @Override
    @Transactional
    public void save(Integer chatRoomId, ChatEntity chatEntity) {
        messageRedisTemplate.opsForList().rightPush(chatRoomId, chatEntity);
    }
}
