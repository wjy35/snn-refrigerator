package com.ssafy.share.api.response;

import lombok.Data;

@Data
public class MemberResponse {
    private String nickname;
    private String profileImageUrl;

    public MemberResponse(String nickname, String profileImageUrl) {
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }
}
