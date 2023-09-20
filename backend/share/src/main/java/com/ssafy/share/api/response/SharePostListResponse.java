package com.ssafy.share.api.response;

import lombok.Data;

import java.util.List;

@Data
public class SharePostListResponse { // 나눔글 리스트에서 보여줄 dto
    private String locationName;
    private List<SharePostResponse> sharePostResponses;

    public SharePostListResponse(String locationName, List<SharePostResponse> sharePostResponses) {
        this.locationName = locationName;
        this.sharePostResponses = sharePostResponses;
    }
}
