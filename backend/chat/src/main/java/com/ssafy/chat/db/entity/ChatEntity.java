package com.ssafy.chat.db.entity;

import lombok.Builder;
import lombok.Data;
import java.io.Serializable;
import java.sql.Timestamp;

@Data
@Builder
public class ChatEntity implements Serializable {
    private Long memberId;
    private String content;
    @Builder.Default
    private Timestamp timestamp = new Timestamp(System.currentTimeMillis());
}
