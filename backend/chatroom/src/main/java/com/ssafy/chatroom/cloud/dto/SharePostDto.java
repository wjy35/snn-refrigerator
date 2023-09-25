package com.ssafy.chatroom.cloud.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SharePostDto {
    private String locationName="defaultLocationName";
}
