package com.ssafy.alarm.api.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import java.util.Map;

@Builder(toBuilder = true)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Response {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String request;
    private String message;
    @Singular("response")
    private Map<String,Object> data;
}


