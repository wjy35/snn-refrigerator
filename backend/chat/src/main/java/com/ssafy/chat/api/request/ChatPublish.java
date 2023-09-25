package com.ssafy.chat.api.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
public class ChatPublish implements Serializable {
    private Integer chatRoomId;
    private Long memberId;
    private String content;
    private Timestamp timestamp;

    @Builder
    public ChatPublish(Integer chatRoomId, Long memberId, String content, Timestamp timestamp) {
        this.chatRoomId = chatRoomId;
        this.memberId = memberId;
        this.content = content;
        this.timestamp = timestamp;
    }

    public String getDestination(){
        return "/topic/"+this.getChatRoomId()+"/"+this.getMemberId();
    }
}
