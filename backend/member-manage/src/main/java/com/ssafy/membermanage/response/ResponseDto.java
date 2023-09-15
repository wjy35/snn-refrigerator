package com.ssafy.membermanage.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Map;

@Data
@Builder
@RequiredArgsConstructor
public class ResponseDto {

    private final String message; //필수

    @JsonView(ResponseViews.Show.class)
    private final Map<String, Object> request; //옵션

    private final Map<String, Object> data; //필수
}
