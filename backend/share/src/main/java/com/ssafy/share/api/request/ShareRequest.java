package com.ssafy.share.api.request;

import lombok.Data;

@Data
public class ShareRequest {
    private Long giverId;
    private Long takerId;

    public ShareRequest(Long giverId, Long takerId) {
        this.giverId = giverId;
        this.takerId = takerId;
    }
}