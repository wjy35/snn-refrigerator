package com.ssafy.chat;

import com.ssafy.chat.db.entity.ChatEntity;
import com.ssafy.chat.service.ChatSaveService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.List;

@SpringBootTest
class ChatApplicationTests {
    @Autowired
    ChatSaveService chatSaveService;

    @Autowired
    RedisTemplate<Integer,ChatEntity> redisTemplate;

    @Test
    void contextLoads() {
        Assertions.assertNotNull(chatSaveService);
    }

    @Test
    void testSaveChat(){
        // given
        ChatEntity chatEntity = ChatEntity
                .builder()
                .memberId(1l)
                .message("나눠주는데 왜 이렇게 불만이 많죠")
                .build();

        // when
        chatSaveService.save(1,chatEntity);

        // then
        List<ChatEntity> chatList = redisTemplate.opsForList().range(1, 0, -1);
        System.out.println("chatList = " + chatList);
    }

}
