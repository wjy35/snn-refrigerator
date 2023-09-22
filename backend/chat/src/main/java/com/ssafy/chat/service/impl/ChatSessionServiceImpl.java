package com.ssafy.chat.service.impl;

import com.ssafy.chat.config.SessionInfo;
import com.ssafy.chat.service.ChatSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChatSessionServiceImpl implements ChatSessionService {
    private final SessionInfo sessionInfo;
    private final RedisTemplate<String,String> redisTemplate;

    @Override
    public void enterSession(Long memberId) {
        redisTemplate.opsForValue().set("memberId:"+memberId,sessionInfo.getSessionId());
    }

    @Override
    public void exitSession() {

    }
}
