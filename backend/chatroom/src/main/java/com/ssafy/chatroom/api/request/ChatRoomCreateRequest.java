package com.ssafy.chatroom.api.request;

import lombok.Data;

@Data
public class ChatRoomCreateRequest {
    private final Integer sharePostId;
    private final Integer senderMemberId;
}
