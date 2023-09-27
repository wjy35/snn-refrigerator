package com.ssafy.chatroom.cloud.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ChatDto {
    private Long memberId;
    private String content;
    private Timestamp timestamp;
    @Builder
    public ChatDto(Long memberId, String content, Timestamp timestamp) {
        this.memberId = memberId;
        this.content = content;
        this.timestamp = timestamp;
    }
}

