package com.ssafy.api_gateway.authValidation.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {

    No_Header_Valid_Token(HttpStatus.BAD_REQUEST, "There is no valid token in your request header"),
    Kakao_Server_Error(HttpStatus.INTERNAL_SERVER_ERROR, "There is an error in KaKao Server. Please try again."),
    No_Valid_Token(HttpStatus.BAD_REQUEST, "Your token has been expired or is incorrect token.");


    private final HttpStatus httpStatus;
    private final String message;
}
