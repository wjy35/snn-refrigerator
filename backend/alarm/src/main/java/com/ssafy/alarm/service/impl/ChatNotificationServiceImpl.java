package com.ssafy.alarm.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ssafy.alarm.api.request.ChatNotificationRequest;
import com.ssafy.alarm.cloud.dto.MemberDto;
import com.ssafy.alarm.cloud.openfeign.MemberOpenFeign;
import com.ssafy.alarm.db.repository.MemberFcmTokenRepository;
import com.ssafy.alarm.service.ChatNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatNotificationServiceImpl implements ChatNotificationService {
    private final MemberFcmTokenRepository memberFcmTokenRepository;
    private final FirebaseMessaging firebaseMessaging;
    private final MemberOpenFeign memberOpenFeign;
    private final ObjectMapper objectMapper;

    @Override
    public void noticeByChatNotificationRequest(ChatNotificationRequest chatNotificationRequest) {
        memberFcmTokenRepository.findByMemberId(chatNotificationRequest.getReceiveMemberId()).ifPresent(
                (memberFcmTokenEntity)->{

                    MemberDto memberDto = objectMapper.convertValue(
                            memberOpenFeign.getMemberDto(chatNotificationRequest.getSendMemberId()).getData().get("memberInfo"),
                            MemberDto.class);

                    Notification notification = Notification
                            .builder()
                            .setTitle(memberDto.getNickname())
                            .setBody(chatNotificationRequest.getContent())
                            .setImage(memberDto.getProfileImageUrl())
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
