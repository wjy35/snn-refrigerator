package com.ssafy.alarm.service.impl;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ssafy.alarm.api.request.ChatNotificationRequest;
import com.ssafy.alarm.db.repository.MemberFcmTokenRepository;
import com.ssafy.alarm.service.ChatNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatNotificationServiceImpl implements ChatNotificationService {
    private final MemberFcmTokenRepository memberFcmTokenRepository;
    private final FirebaseMessaging firebaseMessaging;

    @Override
    public void noticeByChatNotificationRequest(ChatNotificationRequest chatNotificationRequest) {
        memberFcmTokenRepository.findByMemberId(chatNotificationRequest.getReceiveMemberId()).ifPresent(
                (memberFcmTokenEntity)->{
                    Notification notification = Notification
                            .builder()
                            .setTitle(chatNotificationRequest.getSendMemberNickname())
                            .setBody(chatNotificationRequest.getContent())
                            .setImage(chatNotificationRequest.getProfileImage())
                            .build();

                    Message message = Message
                            .builder()
                            .setToken(memberFcmTokenEntity.getMemberFcmToken())
                            .setNotification(notification)
                            .build();

                    try {
                        firebaseMessaging.send(message);
                    } catch (FirebaseMessagingException e) {
                        throw new RuntimeException(e);
                    }
                }
        );
    }
}
