package com.ssafy.share.api.response;

import com.ssafy.share.db.entity.ShareImage;
import com.ssafy.share.db.entity.ShareIngredient;
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
    private List<ShareIngredientResponse> shareIngredients=new ArrayList<>();
    private String thumbnailUrl;
    private String createdTime;


    public SharePostDetailResponse(SharePost entity,String nickname,String createdTime, String thumbnailUrl) {
        this.title = entity.getTitle();
        this.nickname=nickname;
        this.content = entity.getContent();
        this.createdTime=createdTime;
        this.thumbnailUrl = thumbnailUrl;
    }
}
