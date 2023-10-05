package com.ssafy.share.api.response;

import lombok.Data;

@Data
public class ShareCompleteResponse {
    private Long shareHistoryId;
    private boolean isCompleted;
    private String completedTime;

    public ShareCompleteResponse(Long shareHistoryId, boolean isCompleted, String completedTime) {
        this.shareHistoryId = shareHistoryId;
        this.isCompleted = isCompleted;
        this.completedTime = completedTime;
    }
}
