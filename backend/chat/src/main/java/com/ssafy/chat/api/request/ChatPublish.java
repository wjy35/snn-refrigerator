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
    private Long sendMemberId;
    private Long receiveMemberId;
    private String content;
    private Timestamp timestamp;
    @Builder
    public ChatPublish(Integer chatRoomId, Long sendMemberId, Long receiveMemberId, String content, Timestamp timestamp) {
        this.chatRoomId = chatRoomId;
        this.sendMemberId = sendMemberId;
        this.receiveMemberId = receiveMemberId;
        this.content = content;
        this.timestamp = timestamp;
    }

    public String getEchoDestination(){
        return "/topic/"+this.sendMemberId+"/"+this.chatRoomId;
    }

    public String getChatRoomDetailDestination(){
        return "/topic/"+this.receiveMemberId+"/"+this.chatRoomId;
    }

    public String getChatRoomListDestination(){
        return "/topic/"+this.receiveMemberId;
    }
}
