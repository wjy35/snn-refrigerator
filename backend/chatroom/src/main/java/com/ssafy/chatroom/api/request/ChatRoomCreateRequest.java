package com.ssafy.chatroom.api.request;

import lombok.Data;

@Data
public class ChatRoomCreateRequest {
    Integer sharePostId;
    Long senderMemberId;
    Long receiverMemberId;
}
