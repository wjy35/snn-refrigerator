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
    private final String nickname;

    private final String profileImageUrl;

    private final String birthday;

    @JsonView(MemberViews.Priv.class)
    private final String email;

    @JsonView(MemberViews.Priv.class)
    private final String houseCode;

    private final Integer followCount;

}
