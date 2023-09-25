
package com.ssafy.chatroom.util;

import com.ssafy.chatroom.cloud.dto.MemberDto;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@Aspect
public class ChatMemberSearchAspect {

    @Around("execution(* com.ssafy.chatroom.service.ChatMemberSearchService.searchByMemberId())")
    public MemberDto around(ProceedingJoinPoint pjp){
        MemberDto memberDto = null;

        try{
            memberDto = (MemberDto) pjp.proceed();
        }catch (Throwable e){
            memberDto = MemberDto
                    .builder()
                    .memberId(0l)
                    .nickname("default")
                    .profileImageUrl("default")
                    .build();
        }

        return memberDto;
    }

}