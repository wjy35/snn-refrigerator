package com.ssafy.share.api.response;

import lombok.Data;

@Data
public class ShareReserveResponse {
    private Long shareHistoryId;

    public ShareReserveResponse(Long shareHistoryId) {
        this.shareHistoryId = shareHistoryId;
    }
}
