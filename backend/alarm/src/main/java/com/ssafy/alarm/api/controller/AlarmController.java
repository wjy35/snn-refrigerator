package com.ssafy.alarm.api.controller;

import com.ssafy.alarm.api.mapper.MemberFcmTokenMapper;
import com.ssafy.alarm.api.request.MemberFcmTokenSaveRequest;
import com.ssafy.alarm.api.response.Response;
import com.ssafy.alarm.service.MemberFcmTokenSaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AlarmController {
    private final MemberFcmTokenSaveService fcmTokenSaveService;

    @PostMapping("/")
    ResponseEntity<Response> saveMemberFcmToken(@RequestBody MemberFcmTokenSaveRequest memberFcmTokenSaveRequest){

        fcmTokenSaveService.save(MemberFcmTokenMapper.INSTANCE.requestToEntity(memberFcmTokenSaveRequest));
        Response response = Response
                .builder()
                .message("OK")
                .build();
        return new ResponseEntity(response,HttpStatus.OK);
    }


}
