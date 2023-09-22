package com.ssafy.membermanage.member.request;

import lombok.Data;

@Data
public class SignupRequest {
    private Long memberId;
    private String nickname;
    private String profileImageFilename;
    private String houseCode;
    private String birthday;
    private String email;
}
