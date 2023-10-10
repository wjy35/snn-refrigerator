package com.ssafy.alarm.scheduled;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ssafy.alarm.cloud.dto.MemberDto;
import com.ssafy.alarm.cloud.openfeign.MemberOpenFeign;
import com.ssafy.alarm.db.entity.HouseIngredientEntity;
import com.ssafy.alarm.db.entity.MemberFcmTokenEntity;
import com.ssafy.alarm.db.repository.HouseIngredientRepository;
import com.ssafy.alarm.db.repository.MemberFcmTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class HouseIngredientNotification {
    private final HouseIngredientRepository houseIngredientRepository;
    private final MemberFcmTokenRepository memberFcmTokenRepository;
    private final MemberOpenFeign memberOpenFeign;
    private final ObjectMapper objectMapper;
    private final FirebaseMessaging firebaseMessaging;

    @Scheduled(cron = "0 30 0 * * ?")
    public void alert() {

        for(MemberFcmTokenEntity memberFcmTokenEntity: memberFcmTokenRepository.findAll()){
            MemberDto memberDto = objectMapper.convertValue(
                    memberOpenFeign.getMemberDto(memberFcmTokenEntity.getMemberId()).getData().get("memberInfo"),
                    MemberDto.class);

            List<HouseIngredientEntity> houseIngredientEntityList = houseIngredientRepository.findAllByHouseCode(memberDto.getHouseCode());
            for(HouseIngredientEntity houseIngredientEntity: houseIngredientEntityList){
                long lastDay = Duration.between(LocalDate.now(),houseIngredientEntity.getLastDate()).getSeconds()/86400;
                if(lastDay<2){
                    Notification notification = Notification
                            .builder()
                            .setTitle("신나냉")
                            .setBody("소비기한이 곧 만료되는 식재료를 확인하세요!")
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
            }
        }
    }
}
