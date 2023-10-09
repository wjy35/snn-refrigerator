package com.ssafy.alarm.api.request;

import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatNotificationRequest implements Serializable {
    Long receiveMemberId;
    Long sendMemberId;
    String content;
}
