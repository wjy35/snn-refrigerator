package com.ssafy.chatroom.cloud.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SharePostDto {
    private String locationName;
}
