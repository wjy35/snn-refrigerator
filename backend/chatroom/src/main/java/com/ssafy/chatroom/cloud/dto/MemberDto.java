package com.ssafy.chatroom.cloud.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

@Data
@Builder
public class MemberDto {
    @Builder.Default
    private String nickname="defaultNickname";
    private String profileImageUrl="defaultImage";
}
