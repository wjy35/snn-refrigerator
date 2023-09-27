package com.ssafy.chat.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatForListResponse {
    private Integer chatRoomId;
    private String content;
    private Timestamp timestamp;
}
