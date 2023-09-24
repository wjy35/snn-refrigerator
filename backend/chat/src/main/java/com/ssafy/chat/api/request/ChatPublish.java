package com.ssafy.chat.api.request;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
@Builder
public class ChatPublish implements Serializable {
    private Long memberId;
    private String content;
    private Timestamp timestamp;
}
