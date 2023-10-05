package com.ssafy.alarm.api.request;

import lombok.Data;

@Data
public class MemberFcmTokenSaveRequest {
    Long memberId;
    String memberFcmToken;
}
