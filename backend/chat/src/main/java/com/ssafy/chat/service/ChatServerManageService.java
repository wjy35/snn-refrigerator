package com.ssafy.chat.service;

public interface ChatServerManageService {
    void enter(Long memberId, String simpSessionId);
    void leave(String simpSessionId);
    String getChatServerIdByMemberId(Long memberId);
}
