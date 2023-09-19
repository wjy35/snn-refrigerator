package com.ssafy.chatroom;

import com.ssafy.chatroom.db.entity.ChatRoomEntity;
import com.ssafy.chatroom.db.entity.ChatRoomEntityPK;
import com.ssafy.chatroom.db.repository.ChatRoomRepository;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    @Test
    @Transactional
    void findChatRoom(){
        // given
        Integer sharePostId = 1;
        Long senderMemberId = 1l;
        System.out.println("sharePostId = " + sharePostId);
        System.out.println("senderMemberId = " + senderMemberId);

        // when
        ChatRoomEntity chatRoomEntity = chatRoomRepository
                .findChatRoomEntityBySharePostIdAndAndSenderMemberId(
                        sharePostId,
                        senderMemberId)
                .get();

        // then
        System.out.println("chatRoomEntity.getChatRoomId() = " + chatRoomEntity.getChatRoomId());
        assertNotNull(chatRoomEntity.getChatRoomId());
    }

    @Test
    @Transactional
    void testFindChatRoomsBySenderMemberId(){
        // given
        Long senderMemberId = 1l;
        System.out.println("senderMemberId = " + senderMemberId);

        // when
        List<ChatRoomEntity> chatRoomEntityList = chatRoomRepository
                .findAllBySenderMemberId(senderMemberId);

        // then
        for(ChatRoomEntity chatRoomEntity : chatRoomEntityList){
            System.out.println("chatRoomEntity.getChatRoomId() = " + chatRoomEntity.getChatRoomId());
        }
        assertFalse(chatRoomEntityList.isEmpty());
    }

}
