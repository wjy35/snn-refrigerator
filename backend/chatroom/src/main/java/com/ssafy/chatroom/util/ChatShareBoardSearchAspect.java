package com.ssafy.chatroom.util;

import com.ssafy.chatroom.cloud.dto.ShareBoardDto;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@Aspect
public class ChatShareBoardSearchAspect {

    @Around("execution(* com.ssafy.chatroom.service.ChatMemberSearchService.searchByMemberId(..))")
    public ShareBoardDto around(ProceedingJoinPoint pjp){
        ShareBoardDto shareBoardDto = null;

        try{
            shareBoardDto = (ShareBoardDto) pjp.proceed();
        }catch (Throwable e){
            shareBoardDto = ShareBoardDto
                    .builder()
                    .thumbnailImageUrl("default")
                    .locationName("default")
                    .build();
        }

        return shareBoardDto;
    }
}
