package com.ssafy.chatroom.api.response;

import lombok.Data;
import java.sql.Timestamp;

@Data
public class ChatRoomSearchResponse {
    private Integer chatRoomId;
    private String profileImageUrl;
    private String locationName;
    private String ThumbnailImageUrl;
    private String nickname;
    private String content;
    private Timestamp timestamp;
}
