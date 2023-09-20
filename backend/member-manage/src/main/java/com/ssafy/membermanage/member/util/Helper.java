package com.ssafy.membermanage.member.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;


@Component
public class Helper {
    public Map<String, Object> getKakaoUserInfo(String accessToken) throws JsonProcessingException {
        String kakaoGetUserInfoUrl = "https://kapi.kakao.com/v2/user/me";
        RestTemplate restTemplate=new RestTemplate();

        //Set Header
        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//        headers.add("Accept", "application/json");
        headers.add("Authorization", "Bearer " + accessToken);

        //Set http entity
        HttpEntity<String> kakaoRequest = new HttpEntity<>(headers);

        ResponseEntity<String> stringResponseEntity = restTemplate.exchange(
                kakaoGetUserInfoUrl,
                HttpMethod.GET,
                kakaoRequest,
                String.class
        );

        System.out.println(stringResponseEntity.getStatusCode());

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> Response = mapper.readValue(stringResponseEntity.getBody(), Map.class);
        return Response;
    }
}
