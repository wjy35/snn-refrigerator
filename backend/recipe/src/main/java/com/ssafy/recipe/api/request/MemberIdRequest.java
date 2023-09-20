package com.ssafy.recipe.api.request;

import lombok.Getter;

@Getter
public class MemberIdRequest {
    private long memberId;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }
}
