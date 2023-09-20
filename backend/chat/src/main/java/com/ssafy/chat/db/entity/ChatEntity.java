package com.ssafy.chat.db.entity;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
@Builder
@ToString
public class ChatEntity implements Serializable {
    private Long memberId;
    private String message;
    @Builder.Default
    private Timestamp timestamp = new Timestamp(System.currentTimeMillis());
}
