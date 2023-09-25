package com.ssafy.chatroom.cloud.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MemberDto {
    private Long memberId;
    private String nickname;
    private String profileImageUrl;

    @Builder
    public MemberDto(Long memberId, String nickname, String profileImageUrl) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }
}
