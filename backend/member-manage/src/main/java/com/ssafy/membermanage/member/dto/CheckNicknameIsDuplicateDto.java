package com.ssafy.membermanage.member.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class CheckNicknameIsDuplicateDto {
    public final String message;

    public final String nickname;
}
