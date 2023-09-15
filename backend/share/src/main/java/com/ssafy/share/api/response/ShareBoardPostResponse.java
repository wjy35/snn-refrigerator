package com.ssafy.share.api.response;

import com.ssafy.share.db.entity.SharePost;
import lombok.Data;

@Data
public class ShareBoardPostResponse {
    private Long sharePostId;
    private String title;
    private String nickname;
    private String createDate; // n시간, n일 전 등록
    private String thumbnail;

    public ShareBoardPostResponse(SharePost entity,String nickname) {
        this.sharePostId = entity.getSharePostId();
        this.title = entity.getTitle();
        this.nickname = nickname;
        this.createDate = entity.getCreateDate().toString();
        this.thumbnail = entity.getThumbnail();
    }
}
