package com.ssafy.share.api.request;


import com.ssafy.share.db.entity.LocationInfo;
import com.ssafy.share.db.entity.ShareImage;
import com.ssafy.share.db.entity.ShareIngredient;
import com.ssafy.share.db.entity.SharePost;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ShareBoardUpdateRequest {
    private Short locationId;
    private LocationInfo locationInfo;
    private String title;
    private String content;
    private List<ShareIngredient> shareIngredients;
    private List<ShareImage> shareImages;

    public ShareBoardUpdateRequest(Long memberId, Short locationId, String title, String content) {
        this.shareIngredients=new ArrayList<>();
        this.locationId = locationId;
        this.title = title;
        this.content = content;
    }

}
