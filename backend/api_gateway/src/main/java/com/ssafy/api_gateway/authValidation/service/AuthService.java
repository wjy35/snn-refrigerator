 package com.ssafy.api_gateway.authValidation.service;

 import com.fasterxml.jackson.core.JsonProcessingException;
 import com.fasterxml.jackson.databind.ObjectMapper;
 import com.ssafy.api_gateway.authValidation.exception.CustomException;
 import com.ssafy.api_gateway.authValidation.exception.ErrorCode;
 import lombok.RequiredArgsConstructor;
 import org.springframework.http.HttpEntity;
 import org.springframework.http.HttpHeaders;
 import org.springframework.http.HttpMethod;
 import org.springframework.http.ResponseEntity;
 import org.springframework.stereotype.Service;
 import org.springframework.web.client.RestTemplate;

 import java.util.Map;

 @Service
 @RequiredArgsConstructor
 public class AuthService {
     public Long validateToken(String accessToken) throws JsonProcessingException {
         String kakaoTokenCheckUrl = "https://kapi.kakao.com/v1/user/access_token_info";

         RestTemplate restTemplate=new RestTemplate();
         //set header
         HttpHeaders headers = new HttpHeaders();
         headers.add("Authorization", accessToken);

         HttpEntity<String> kakaoRequest = new HttpEntity<>(headers);
         ResponseEntity<String> stringResponseEntity = restTemplate.exchange(
                 kakaoTokenCheckUrl,
                 HttpMethod.GET,
                 kakaoRequest,
                 String.class
         );

         ObjectMapper mapper = new ObjectMapper();
         Map<String, Object> kakaoResponse = mapper.readValue(stringResponseEntity.getBody(), Map.class);

         if(stringResponseEntity.getStatusCode().value() == 401)
             throw new CustomException(ErrorCode.No_Valid_Token);
         else if(stringResponseEntity.getStatusCode().value() == 400){
             if(kakaoResponse.get("code") == "-1")
                 throw new CustomException(ErrorCode.Kakao_Server_Error);
             else
                 throw new CustomException(ErrorCode.No_Valid_Token);

         }

         return (Long) kakaoResponse.get("id");
     }
 }
