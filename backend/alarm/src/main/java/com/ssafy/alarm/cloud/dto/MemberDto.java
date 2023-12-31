package com.ssafy.alarm.cloud.dto;

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
    private String houseCode;

    @Builder
    public MemberDto(Long memberId, String nickname, String profileImageUrl, String houseCode) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.houseCode = houseCode;
    }
}
