package com.ssafy.alarm.api.request;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
@ToString
public class ChatNotificationRequest implements Serializable {
    Long receiveMemberId;
    String content;
    String sendMemberNickname;
    String profileImage;
}
