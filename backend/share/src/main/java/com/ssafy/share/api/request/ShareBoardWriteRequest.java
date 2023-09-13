package com.ssafy.share.api.request;


import com.ssafy.share.db.entity.LocationInfo;
import com.ssafy.share.db.entity.ShareImage;
import com.ssafy.share.db.entity.ShareIngredient;
import com.ssafy.share.db.entity.SharePost;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ShareBoardWriteRequest {
    private Long memberId;
    private Short locationId;
    private String title;
    private String content;
    private List<ShareIngredient> shareIngredients;
    private List<ShareImage> shareImages;

    public ShareBoardWriteRequest(Long memberId, Short locationId, String title, String content) {
        this.shareIngredients=new ArrayList<>();
        this.memberId = memberId;
        this.locationId = locationId;
        this.title = title;
        this.content = content;
    }

    public SharePost toEntity(){
        return SharePost.builder().memberId(memberId).locationId(locationId).title(title).content(content)
                .shareIngredients(shareIngredients).shareImages(shareImages).build();
    }
}
