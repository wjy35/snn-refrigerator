package com.ssafy.share.api.request;


import com.ssafy.share.db.entity.LocationInfo;
import com.ssafy.share.db.entity.Member;
import com.ssafy.share.db.entity.ShareImage;
import com.ssafy.share.db.entity.ShareIngredient;
import lombok.Data;

import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Data
public class ShareBoardWriteRequest {

    private Member member;
    private LocationInfo locationInfo;
    private String title;
    private String content;
    private List<ShareIngredient> shareIngredients;
    private List<ShareImage> shareImages;
}
