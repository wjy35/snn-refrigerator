package com.ssafy.chat.api.request;

import lombok.Data;

@Data
public class ChatPayload {
    private final Integer chatRoomId;
    private final Long sendMemberId;
    private final Long receiveMemberId;
    private final String content;
}

