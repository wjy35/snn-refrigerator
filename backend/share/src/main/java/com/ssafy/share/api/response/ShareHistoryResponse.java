package com.ssafy.share.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShareHistoryResponse {
    private Long shareHistoryId;
    private String giver;
    private String taker;
    private Boolean isCompleted;
    private String completedTime;

}