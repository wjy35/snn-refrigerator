package com.ssafy.membermanage.member.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.member.db.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class MemberServiceImpl {
    @Autowired
    private MemberRepository memberRepository;

    public Member modifyMemberHouse(Member member, String houseCode) throws CustomException{
        member.setHouseCode(houseCode);
        member = memberRepository.save(member);
        return member;
    }

    public Optional<Member> findByMemberId(Long id){
        return memberRepository.findByMemberId(id);
    }

    public boolean existsByNickname(String nickname){
        return memberRepository.existsByNickname(nickname);
    }

    public Optional<Member> findByNickname(String nickname){ return memberRepository.findByNickname(nickname);}

    public Member save(Member member){
        return memberRepository.save(member);
    }

    public void deleteByMemberId(Long id){
        memberRepository.deleteById(id);
    }

    public String getToken(HttpServletRequest request){
        String authorizationHeader = request.getHeader("Authorization");
        if(!authorizationHeader.startsWith("Bearer ")){
            throw new CustomException(ErrorCode.No_Header_Valid_Token);
        }

        return authorizationHeader.substring(7); //access token
    }

    public Long validateToken(HttpServletRequest request) throws JsonProcessingException {
        String accessToken = getToken(request);
        String kakaoTokenCheckUrl = "https://kapi.kakao.com/v1/user/access_token_info";

        RestTemplate restTemplate=new RestTemplate();
        //set header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

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

    public boolean kakaoLogout(HttpServletRequest request, Long memberId){
        try {
            String authorizationHeader = request.getHeader("Authorization");
            if (!authorizationHeader.startsWith("Bearer ")) {
                throw new CustomException(ErrorCode.No_Valid_Token);
            }

            String accessToken = authorizationHeader.substring(7);
            String kakaoLogoutUrl = "https://kapi.kakao.com/v1/user/logout";

            RestTemplate restTemplate = new RestTemplate();
            restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
            //set header
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.add("Accept", "application/json");
            headers.add("Authorization", "bearer " + accessToken);

            HttpEntity<String> kakaoRequest = new HttpEntity<>(headers);
            ResponseEntity<String> stringResponseEntity = restTemplate.exchange(
                    kakaoLogoutUrl,
                    HttpMethod.POST,
                    kakaoRequest,
                    String.class
            );

            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> kakaoResponse = mapper.readValue(stringResponseEntity.getBody(), Map.class);
            Long kakaoId = (Long) kakaoResponse.getOrDefault("id", -1);
            if (Long.compare(kakaoId, memberId) != 0) throw new CustomException(ErrorCode.Logout_Failure);
            return true;
        }
        catch(Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public String createHouseCode(){
        return UUID.randomUUID().toString();
    }

    public boolean existsByHouseCode(String houseCode){
        return memberRepository.existsByHouseCode(houseCode);
    }
}
