package com.ssafy.share.api.response;

import com.ssafy.share.db.entity.ShareImage;
import com.ssafy.share.db.entity.SharePost;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class SharePostDetailResponse {
    private String title;
    private String nickname;
    private String locationName;
    private String content;
    private List<String> shareImages=new ArrayList<>(); // url들 들어갈거임

    public SharePostDetailResponse(SharePost entity,String nickname) {
        this.title = entity.getTitle();
        this.nickname = nickname;
        this.locationName = entity.getLocationInfo().getLocationName();
        this.content = entity.getContent();
        for (ShareImage imgs:entity.getShareImages()){
            shareImages.add(imgs.getSharePostImageUrl());
        }
    }
}
