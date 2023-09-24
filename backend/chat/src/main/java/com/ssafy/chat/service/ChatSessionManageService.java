package com.ssafy.chat.service;

public interface ChatSessionManageService {
    void enter(Long memberId, String simpSessionId);
    void leave(String simpSessionId);
    boolean isEnteredMemberId(Long memberId);
}
