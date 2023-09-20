package com.ssafy.chat;

import com.ssafy.chat.db.entity.ChatEntity;
import com.ssafy.chat.service.ChatSaveService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.transaction.annotation.Transactional;

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
        int beforeSize = redisTemplate.opsForList().range(1, 0, -1).size();

        ChatEntity firstChatEntity = ChatEntity
                .builder()
                .memberId(0l)
                .message("감자 많이 주세요")
                .build();
        ChatEntity secondChatEntity = ChatEntity
                .builder()
                .memberId(0l)
                .message("나눠주는데 왜 이렇게 불만이 많죠")
                .build();

        System.out.println("beforeSize = " + beforeSize);
        System.out.println("firstChatEntity = " + firstChatEntity);
        System.out.println("secondChatEntity = " + secondChatEntity);

        // when
        chatSaveService.save(1,firstChatEntity);
        chatSaveService.save(1,secondChatEntity);

        // then
        List<ChatEntity> chatList = redisTemplate.opsForList().range(1, 0, -1);
        int afterSize = chatList.size();

        System.out.println("afterSize = " + afterSize);
        System.out.println("chatList = " + chatList);
        Assertions.assertTrue(beforeSize<afterSize);
    }

}
