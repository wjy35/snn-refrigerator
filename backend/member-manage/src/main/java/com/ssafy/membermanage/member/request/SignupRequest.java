package com.ssafy.membermanage.member.request;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class SignupRequest {
    private Long memberId;
    private String nickname;
    private String houseCode;
    private String birthday;
    private String email;
}
