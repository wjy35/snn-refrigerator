package com.ssafy.share.api.request;


import com.ssafy.share.db.entity.ShareIngredient;
import lombok.Data;

import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Data
public class ShareBoardWriteRequest {

    private Long memberId;
    private Short locationId;
    private String title;
    private String content;
    private List<ShareIngredient> shareIngredients;
    private List<String> shareImages;

}
