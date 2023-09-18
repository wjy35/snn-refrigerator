package com.ssafy.recipe.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberResponse {
    private String nickname;
    private long followCount;
}
