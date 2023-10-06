package com.ssafy.share.api.request;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class ShareRequest {
    private Long giverId;
    private Long takerId;
    private Map<Short, Integer> ingredients = new HashMap<>();

    public ShareRequest(Long giverId, Long takerId, Map<Short, Integer> ingredients) {
        this.giverId = giverId;
        this.takerId = takerId;
        this.ingredients = ingredients;
    }
}