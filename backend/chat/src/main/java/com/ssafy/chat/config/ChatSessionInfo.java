package com.ssafy.chat.config;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ChatSessionInfo {
    private final String id;

    public ChatSessionInfo() {
        this.id = UUID.randomUUID().toString();
    }

    @Bean
    public String chatSessionId() {
        return id;
    }
}
