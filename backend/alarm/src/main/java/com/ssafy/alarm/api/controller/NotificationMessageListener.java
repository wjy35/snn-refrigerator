package com.ssafy.alarm.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.alarm.api.request.ChatNotificationRequest;
import com.ssafy.alarm.service.ChatNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Controller;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class NotificationMessageListener {
    private final ObjectMapper objectMapper;
    private final ChatNotificationService chatNotificationService;

    @RabbitListener(queues = "chat-queue")
    public void notice(Message message) {
        ChatNotificationRequest chatNotificationRequest = null;
        try {
            chatNotificationRequest = objectMapper.readValue(message.getBody(), ChatNotificationRequest.class);
            chatNotificationService.noticeByChatNotificationRequest(chatNotificationRequest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
