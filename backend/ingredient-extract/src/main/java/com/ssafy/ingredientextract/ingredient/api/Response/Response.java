package com.ssafy.ingredientextract.ingredient.api.Response;


import com.fasterxml.jackson.annotation.JsonView;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Map;

@Data
@Builder
@RequiredArgsConstructor
public class Response {

    @JsonView(ResponseViews.NoRequest.class)
    private final String message; //필수

    @JsonView(ResponseViews.Request.class)
    private final Map<String, Object> request; //옵션

    @JsonView(ResponseViews.NoRequest.class)
    private final Map<String, Object> data; //필수

}
