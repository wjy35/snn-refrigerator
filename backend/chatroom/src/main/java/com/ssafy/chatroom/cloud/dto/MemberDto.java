package com.ssafy.chatroom.cloud.dto;

import lombok.Data;

@Data
public class MemberDto {
    private Long memberId;
    private String nickname;
    private String houseCode;
    private String profileImageUrl;
    private String birthday;
    private String email;
    private Integer followCount;
}
