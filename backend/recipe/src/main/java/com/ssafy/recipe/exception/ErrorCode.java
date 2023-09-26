package com.ssafy.recipe.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // member
    NOT_FOUND_MEMBER("사용자를 찾을 수 없습니다", HttpStatus.NOT_FOUND),

    // recipe
    NOT_FOUND_RECIPE("레시피를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),

    // favorite_recipe
    NOT_FOUND_FAVORITE_RECIPE("검색된 즐겨찾기 레시피가 없습니다.", HttpStatus.NOT_FOUND),

    // S3
    S3_Delete_Failure("이미지 url 삭제 실패", HttpStatus.BAD_REQUEST);

    private final String message;
    private final HttpStatus errorCode;

    ErrorCode(String message, HttpStatus errorCode) {
        this.message = message;
        this.errorCode = errorCode;
    }
}
