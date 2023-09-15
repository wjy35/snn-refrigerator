package com.ssafy.membermanage.house.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ModifyMemberHouseDto {
    private final Long memberId;

    private final String houseCode;
}
