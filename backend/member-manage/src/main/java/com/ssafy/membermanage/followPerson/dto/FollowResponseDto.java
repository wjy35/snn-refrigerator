package com.ssafy.membermanage.followPerson.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class FollowResponseDto {
    private final Long followerId;

    private final Long followeeId;

    private final String flag;
}
