package com.ssafy.chatroom.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.chatroom.cloud.dto.MemberDto;
import com.ssafy.chatroom.cloud.openfeign.MemberOpenFeign;
import com.ssafy.chatroom.service.ChatMemberSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatMemberSearchServiceImpl implements ChatMemberSearchService {
    private final MemberOpenFeign memberOpenFeign;
    private final ObjectMapper objectMapper;

    @Override
    public MemberDto searchByMemberId(Long memberId) {
        // TODO memberInfo 에 종속적이지 않은 코드를 짤 수 없을지 고민해보자!
        return objectMapper.convertValue(
                memberOpenFeign.getMemberDto(memberId).getData().get("memberInfo"),
                MemberDto.class);
    }

}
