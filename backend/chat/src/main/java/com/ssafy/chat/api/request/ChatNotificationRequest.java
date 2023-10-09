package com.ssafy.chat.api.request;

import lombok.*;

import java.io.Serializable;

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
