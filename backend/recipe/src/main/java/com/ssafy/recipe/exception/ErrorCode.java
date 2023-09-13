package com.ssafy.recipe.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    NOT_FOUND_MEMBER("사용자를 찾을 수 없습니다", HttpStatus.NOT_FOUND);

    private final String message;
    private final HttpStatus errorCode;

    ErrorCode(String message, HttpStatus errorCode) {
        this.message = message;
        this.errorCode = errorCode;
    }
}
