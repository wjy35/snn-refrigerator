package com.ssafy.membermanage.followPerson.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class FollowRequestDto {
    private final Long followerId;

    private final Long followeeId;
}
