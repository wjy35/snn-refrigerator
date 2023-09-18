package com.ssafy.membermanage.member.dto;

import com.fasterxml.jackson.annotation.JsonView;
import com.ssafy.membermanage.member.MemberViews;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@RequiredArgsConstructor
public class GetInfoDto {
    @JsonView(MemberViews.Public.class)
    private final String nickname;

    @JsonView(MemberViews.Public.class)
    private final String profileImageUrl;

    @JsonView(MemberViews.Public.class)
    private final String birthday;

    @JsonView(MemberViews.Private.class)
    private final String email;

    @JsonView(MemberViews.Private.class)
    private final String houseCode;

    @JsonView(MemberViews.Public.class)
    private final Integer followCount;

}
