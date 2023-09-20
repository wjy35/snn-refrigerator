package com.ssafy.share.api.response;

import com.ssafy.share.db.entity.SharePost;
import lombok.Data;

@Data
public class SharePostResponse { // 나눔글 목록 응답 DTO의 글 정보 부분
    private Long sharePostId;
    private String title;
    private String nickname;
    private String createDate; // n시간, n일 전 등록
    private String userProfileImageUrl;
    private String thumbnail;

    public SharePostResponse(SharePost entity, String nickname, String userProfileImageUrl) {
        this.sharePostId = entity.getSharePostId();
        this.title = entity.getTitle();
        this.nickname = nickname;
        this.createDate = entity.getCreateDate().toString();
        this.userProfileImageUrl=userProfileImageUrl;
        this.thumbnail = entity.getThumbnail();
    }
}
