package com.ssafy.chatroom.db.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class ChatRoomEntityPK implements Serializable {
    private Integer sharePostId;
    private Long senderMemberId;
}
