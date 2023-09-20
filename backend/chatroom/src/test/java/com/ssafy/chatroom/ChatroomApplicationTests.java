package com.ssafy.chatroom;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.chatroom.cloud.dto.ChatDto;
import com.ssafy.chatroom.cloud.dto.MemberDto;
import com.ssafy.chatroom.cloud.openfeign.ChatOpenFeign;
import com.ssafy.chatroom.cloud.openfeign.MemberOpenFeign;
import com.ssafy.chatroom.db.entity.ChatRoomEntity;
import com.ssafy.chatroom.db.repository.ChatRoomRepository;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@SpringBootTest
class ChatroomApplicationTests {

    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Autowired
    MemberOpenFeign memberOpenFeign;

    @Autowired
    ChatOpenFeign chatOpenFeign;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void contextLoads() {
        // given-when-then
        assertNotNull(chatRoomRepository);
        assertNotNull(memberOpenFeign);
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
    void testFindChatRoomsBySenderMemberIdOrReceiverMemberId(){
        // given
        Long memberId = 1l;
        System.out.println("memberId = " + memberId);

        // when
        List<ChatRoomEntity> chatRoomEntityList = chatRoomRepository
                .findAllBySenderMemberIdOrReceiverMemberId(memberId,memberId);

        // then
        for(ChatRoomEntity chatRoomEntity : chatRoomEntityList){
            System.out.println("chatRoomEntity.getChatRoomId() = " + chatRoomEntity.getChatRoomId());
        }
        assertFalse(chatRoomEntityList.isEmpty());
    }

    @Test
    void testMemberDtoOpenFeign(){
        // given
        Long memberId = 1l;
        System.out.println("memberId = " + memberId);

        // when
        MemberDto memberDto = memberOpenFeign.getMemberDto(memberId);

        // then
        System.out.println("memberDto = " + memberDto);
        assertNotNull(memberDto);
    }

    @Test
    void testChatDtoOpenFeign(){
        // given
        Integer chatRoomId = 1;

        // when
        ChatDto chatDto = objectMapper.convertValue(chatOpenFeign.getChatDto(chatRoomId).getData().get("chat"),ChatDto.class);

        // then
        System.out.println("chatDto = " + chatDto);
        Assertions.assertNotNull(chatDto);
    }

}
