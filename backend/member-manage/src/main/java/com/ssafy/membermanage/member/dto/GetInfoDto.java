package com.ssafy.membermanage.member.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class GetInfoDto {
    private final String nickname;

    private final String profileImageUrl;

    private final String birthday;

    private final String email;

    private final String houseCode;

    private final Integer followCount;

}
