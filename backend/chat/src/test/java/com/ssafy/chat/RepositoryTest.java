package com.ssafy.chat;

import com.ssafy.chat.db.repository.MemberIdRepository;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class RepositoryTest {
    @Autowired
    MemberIdRepository memberIdRepository;

    @Test
    void testLoadMemberIdRepository(){
        // given-when-then
        assertNotNull(memberIdRepository);
    }

    @Test
    void testSaveMemberId(){
        // given
        Long memberId = 3029548333l;
        String simpSessionId = "test";

        // when-then
        assertDoesNotThrow(()->{
            memberIdRepository.saveBySimpSessionId(simpSessionId,memberId);
        });
    }

    @Test
    void testDelete(){
        // given
        Long memberId = 3029548333l;
        String simpSessionId = "test";
        memberIdRepository.saveBySimpSessionId(simpSessionId,memberId);

        // when-then
        assertDoesNotThrow(()->{
            memberIdRepository.deleteAndGetBySimpSessionId(simpSessionId);
        });
    }

}
