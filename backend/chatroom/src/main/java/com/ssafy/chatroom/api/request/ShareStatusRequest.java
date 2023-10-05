package com.ssafy.chatroom.api.request;

import lombok.Data;


@Data
public class ShareStatusRequest {
    Long memberId;
    Integer chatRoomId;
    Boolean shareStatus;
}
