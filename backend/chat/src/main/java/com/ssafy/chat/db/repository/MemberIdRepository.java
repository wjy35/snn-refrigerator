package com.ssafy.chat.db.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberIdRepository {
    @Value("${MEMBER_ID_REPOSITORY_KEY_PREFIX}")
    private String simpSessionIdPrefix;
    private final RedisTemplate<String,Long> redisTemplate;

    public void saveBySimpSessionId(String simpSessionId, Long memberId){
        redisTemplate.opsForValue().set(simpSessionIdPrefix+simpSessionId, memberId);
    }

    public void deleteBySimpSessionId(String simpSessionId){
        redisTemplate.opsForValue().getAndDelete(simpSessionIdPrefix+simpSessionId);
    }

}
