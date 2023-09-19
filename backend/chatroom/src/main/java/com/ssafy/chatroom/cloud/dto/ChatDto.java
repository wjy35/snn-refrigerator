package com.ssafy.chatroom.cloud.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ChatDto {
    private String lastMessage;
    private Timestamp lastMessageDateTime;
}
