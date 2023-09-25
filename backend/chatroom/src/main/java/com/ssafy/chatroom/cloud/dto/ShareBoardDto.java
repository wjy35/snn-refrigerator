package com.ssafy.chatroom.cloud.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ShareBoardDto {
    private String thumbnailImageUrl;
    private String locationName;

    @Builder
    public ShareBoardDto(String thumbnailImageUrl, String locationName) {
        this.thumbnailImageUrl = thumbnailImageUrl;
        this.locationName = locationName;
    }
}
