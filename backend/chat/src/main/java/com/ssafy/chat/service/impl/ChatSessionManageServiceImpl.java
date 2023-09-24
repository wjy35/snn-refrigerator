package com.ssafy.chat.service.impl;

import com.ssafy.chat.db.repository.MemberIdRepository;
import com.ssafy.chat.db.repository.ChatServerIdRepository;
import com.ssafy.chat.service.ChatSessionManageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatSessionManageServiceImpl implements ChatSessionManageService {
    private final MemberIdRepository memberIdRepository;
    private final ChatServerIdRepository chatServerIdRepository;

    @Override
    public void enter(Long memberId, String simpSessionId) {
        memberIdRepository.saveBySimpSessionId(simpSessionId,memberId);
        chatServerIdRepository.saveByMemberId(memberId);
    }

    @Override
    public void leave(String simpSessionId) {
        Long memberId = memberIdRepository.deleteAndGetBySimpSessionId(simpSessionId);
        chatServerIdRepository.deleteByMemberId(memberId);
    }

    @Override
    public boolean isEnteredMemberId(Long memberId) {
        return chatServerIdRepository.isEnteredMemberId(memberId);
    }
}
