package com.ssafy.chatroom;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.chatroom.cloud.dto.ChatDto;
import com.ssafy.chatroom.cloud.dto.MemberDto;
import com.ssafy.chatroom.cloud.dto.ShareBoardDto;
import com.ssafy.chatroom.cloud.openfeign.ChatOpenFeign;
import com.ssafy.chatroom.cloud.openfeign.MemberOpenFeign;
import com.ssafy.chatroom.cloud.openfeign.ShareBoardOpenFeign;
import com.ssafy.chatroom.db.entity.ChatRoomEntity;
import com.ssafy.chatroom.db.repository.ChatRoomRepository;
import static org.junit.jupiter.api.Assertions.*;

import com.ssafy.chatroom.db.repository.ShareStatusRepository;
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
    ShareBoardOpenFeign shareBoardOpenFeign;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    ShareStatusRepository shareStatusRepository;

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
        Long senderMemberId = 3029548333l;
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
        Long memberId = 3029548333l;
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
        // Test MemberId 3029548333
        Long memberId = 3029548333l;
        System.out.println("memberId = " + memberId);

        // when
        MemberDto memberDto = objectMapper.convertValue(memberOpenFeign.getMemberDto(memberId).getData().get("memberInfo"),MemberDto.class);

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

    // TODO AOP Test 에 추가
    @Test
    void testShareBoardOpenFeign(){
        // given
        Integer shareBoardId = 8;

        ShareBoardDto shareBoardDto = objectMapper.convertValue(shareBoardOpenFeign.getShareBoardDto(3).getData().get("response"),ShareBoardDto.class);

        System.out.println("shareBoardDto = " + shareBoardDto);
    }

    @Test
    void testShareStatusRepo(){
        shareStatusRepository.findAllByChatRoomIdAndShareStatusIsTrue(1);
    }

}
