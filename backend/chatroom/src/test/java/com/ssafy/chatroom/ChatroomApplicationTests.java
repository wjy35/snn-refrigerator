package com.ssafy.chatroom;

import com.ssafy.chatroom.db.entity.ChatRoomEntity;
import com.ssafy.chatroom.db.repository.ChatRoomRepository;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class ChatroomApplicationTests {

    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Test
    void contextLoads() {
        // given-when-then
        assertNotNull(chatRoomRepository);
    }

    @Test
    @Transactional
    void insertChatRoom(){
        // given
        ChatRoomEntity insertedChatRoomEntity = ChatRoomEntity
                .builder()
                .senderMemberId(0l)
                .sharePostId(0)
                .build();
        System.out.println("insertedChatRoomEntity = " + insertedChatRoomEntity);

        // when
        ChatRoomEntity selectedChatRoomEntity = chatRoomRepository.save(insertedChatRoomEntity);

        // then
        System.out.println("selectedChatRoomEntity = " + selectedChatRoomEntity);
        assertEquals(selectedChatRoomEntity.getChatRoomId(),insertedChatRoomEntity.getChatRoomId());

    }
}
