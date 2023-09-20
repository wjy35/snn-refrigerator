package com.ssafy.chat;

import com.ssafy.chat.db.entity.ChatEntity;
import com.ssafy.chat.service.ChatSaveService;
import com.ssafy.chat.service.ChatViewService;
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
    ChatViewService chatViewService;

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
        Long memberId = 1l;

        ChatEntity firstChatEntity = ChatEntity
                .builder()
                .memberId(memberId)
                .message("감자 많이 주세요")
                .build();
        ChatEntity secondChatEntity = ChatEntity
                .builder()
                .memberId(memberId)
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

    @Test
    void testViewCurrentChat(){
        // given
        Integer chatRoomId = 0;
        Long MemberId = 1l;
        ChatEntity lastChatEntity = ChatEntity
                .builder()
                .memberId(MemberId)
                .message("Last Chat!")
                .build();
        chatSaveService.save(chatRoomId,lastChatEntity);

        // when
        ChatEntity selectedChatEntity = chatViewService.viewCurrentChat(chatRoomId);

        // then
        System.out.println("selectedChatEntity = " + selectedChatEntity);
        Assertions.assertEquals(lastChatEntity.getMemberId(),selectedChatEntity.getMemberId());
    }

    @Test
    void testViewAllChat(){
        // given
        Integer chatRoomId = 0;
        Long MemberId = 1l;
        ChatEntity lastChatEntity = ChatEntity
                .builder()
                .memberId(MemberId)
                .message("Last Chat!")
                .build();
        chatSaveService.save(chatRoomId,lastChatEntity);

        // when
        List<ChatEntity> selectedChatEntityList = chatViewService.viewAllChat(chatRoomId);

        // then
        System.out.println("selectedChatEntityList = " + selectedChatEntityList);
        Assertions.assertEquals(
                selectedChatEntityList.get(selectedChatEntityList.size()-1).getMemberId(),
                lastChatEntity.getMemberId()
        );
    }
}
