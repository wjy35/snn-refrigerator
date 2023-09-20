package com.ssafy.recipe.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Builder
public class MemberResponse {
    private String nickname;
    private long followCount;
    private int houseSeq;

}
