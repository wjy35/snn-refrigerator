package com.ssafy.share.api.request;


import com.ssafy.share.db.entity.ShareImage;
import com.ssafy.share.db.entity.ShareIngredient;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ShareBoardUpdateRequest {
    private Long memberId;
    private Short locationId;
    private String title;
    private String content;
    private List<ShareIngredient> shareIngredients;
    private List<ShareImage> shareImages;

    public ShareBoardUpdateRequest(Long memberId, Short locationId, String title, String content) {
        this.shareIngredients=new ArrayList<>();
        this.shareImages=new ArrayList<>();
        this.locationId = locationId;
        this.title = title;
        this.content = content;
    }

}
