package com.ssafy.chatroom.api.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import java.util.Map;

@Builder(toBuilder = true)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Response {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object request;
    private String message;
    @Singular("response")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Map<String,Object> data;
}
