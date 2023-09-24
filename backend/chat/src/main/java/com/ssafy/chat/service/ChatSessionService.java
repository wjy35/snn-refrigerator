package com.ssafy.chat.service;

public interface ChatSessionService {
    void enterSession(Long memberId,String simpSessionId);
    void exitSession(Long memberId);
}
