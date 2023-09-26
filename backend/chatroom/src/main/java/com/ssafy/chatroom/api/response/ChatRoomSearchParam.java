package com.ssafy.chatroom.api.response;

import lombok.Data;
import java.sql.Timestamp;

@Data
public class ChatRoomSearchParam {
    private Integer chatRoomId;
    private String profileImageUrl;
    private String locationName;
    private String thumbnailImageUrl;
    private String nickname;
    private String content;
    private Timestamp timestamp;
}
