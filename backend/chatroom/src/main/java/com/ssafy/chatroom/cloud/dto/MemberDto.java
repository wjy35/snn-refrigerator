package com.ssafy.chatroom.cloud.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MemberDto {
    private Long memberId;
    private String nickname;
    private String profileImageUrl;
}
