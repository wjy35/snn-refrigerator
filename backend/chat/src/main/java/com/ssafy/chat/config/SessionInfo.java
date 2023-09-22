package com.ssafy.chat.config;

import org.springframework.stereotype.Component;
import java.util.UUID;

@Component
public class SessionInfo {
    private final String sessionId;

    public SessionInfo() {
        this.sessionId = UUID.randomUUID().toString();
    }

    public String getSessionId() {
        return sessionId;
    }
}
