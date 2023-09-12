package com.ssafy.recipe.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    Error_EXAMPLE("에러메시지 입력", HttpStatus.NOT_FOUND);

    private final String message;
    private final HttpStatus errorCode;

    ErrorCode(String message, HttpStatus errorCode) {
        this.message = message;
        this.errorCode = errorCode;
    }
}
