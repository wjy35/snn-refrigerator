package com.ssafy.chatroom.cloud.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ChatDto {
    private Long memberId;
    private String content;
    private Timestamp timestamp;
}
