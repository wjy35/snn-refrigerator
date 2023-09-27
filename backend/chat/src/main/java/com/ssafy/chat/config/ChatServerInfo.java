package com.ssafy.chat.config;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ChatServerInfo {
    private final String id;

    public ChatServerInfo() {
        this.id = UUID.randomUUID().toString();
    }

    public String getId() {
        return id;
    }
}
