package com.ssafy.alarm.service;

import com.ssafy.alarm.api.request.ChatNotificationRequest;

public interface ChatNotificationService {
    void noticeByChatNotificationRequest(ChatNotificationRequest chatNotificationRequest);
}
