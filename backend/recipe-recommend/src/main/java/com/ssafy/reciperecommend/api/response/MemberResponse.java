package com.ssafy.reciperecommend.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Builder
public class MemberResponse {
    private String nickname;
    private int followCount;
    private String houseCode;
    private String profileImageUrl;

}
