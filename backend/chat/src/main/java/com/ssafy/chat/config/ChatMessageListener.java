package com.ssafy.chat.config;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatMessageListener implements MessageListener {
    private final RedisTemplate<?,?> redisTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try{

        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
