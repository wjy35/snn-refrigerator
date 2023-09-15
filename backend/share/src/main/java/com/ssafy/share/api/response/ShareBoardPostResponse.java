package com.ssafy.share.api.response;

import lombok.Data;

@Data
public class ShareBoardPostResponse {
    private Long sharePostId;
    private String title;
    private String nickname;
    private String createDate; // n시간, n일 전 등록
    private String thumbnail;
}
