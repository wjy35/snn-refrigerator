package com.ssafy.chatroom.api.response;

import lombok.Data;
import java.sql.Timestamp;

@Data
public class ChatRoomSearchResult {
    private Integer chatRoomId;
    private String nickname;
    private String profileImageUrl;
    private String placeInfo;
    private String lastMessage;
    private Timestamp lastMessageDateTime;
}
