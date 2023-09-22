package com.ssafy.chat.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.UUID;

@Configuration
public class ChatSessionConfig {
    private final String chatSessionId;

    public ChatSessionConfig() {
        this.chatSessionId = UUID.randomUUID().toString();
    }

    @Bean
    public String chatSessionId() {
        return chatSessionId;
    }
}
