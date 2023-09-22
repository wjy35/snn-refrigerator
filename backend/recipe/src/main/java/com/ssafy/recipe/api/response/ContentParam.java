package com.ssafy.recipe.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ContentParam {
    private int order;
    private String content;
}
