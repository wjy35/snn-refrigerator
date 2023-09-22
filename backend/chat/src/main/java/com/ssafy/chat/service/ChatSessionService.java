package com.ssafy.chat.service;

public interface ChatSessionService {
    void enterSession(Long memberId);
    void exitSession();
}
