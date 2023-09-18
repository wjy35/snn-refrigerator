package com.ssafy.chatroom.api.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import java.util.Map;

@Builder(toBuilder = true)
@Getter
public class Response {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String request;
    private String message;
    @Singular("response")
    private Map<String,Object> data;
}
