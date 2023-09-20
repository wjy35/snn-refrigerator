package com.ssafy.membermanage.member.request;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class AuthorizationRequest {
    private String authorizationCode;
}
