package com.ssafy.chatroom.service;

import com.ssafy.chatroom.cloud.dto.MemberDto;

public interface ChatMemberSearchService {
    MemberDto searchByMemberId(Long memberId);
}
