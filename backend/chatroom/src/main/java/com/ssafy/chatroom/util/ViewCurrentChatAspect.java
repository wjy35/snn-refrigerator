package com.ssafy.chatroom.util;

import com.ssafy.chatroom.cloud.dto.ChatDto;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Slf4j
@Component
@Aspect
public class ViewCurrentChatAspect {
    @Around("execution(* com.ssafy.chatroom.service..*.viewByChatRoomId(..))")
    public ChatDto around(ProceedingJoinPoint pjp){
        ChatDto chatDto = null;

        try{
            chatDto = (ChatDto) pjp.proceed();
        }catch (Throwable e){
            chatDto = ChatDto
                    .builder()
                    .content("default")
                    .timestamp(new Timestamp(0l))
                    .build();
        }

        return chatDto;
    }
}
