package com.ssafy.recipe.exception;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
public class ErrorResponse {

    private final String message;

    public static ResponseEntity<ErrorResponse> toResponseEntity(CustomException e) {
        return ResponseEntity
                .status(e.getErrorCode().getErrorCode())
                .body(ErrorResponse.builder()
                        .message(e.getErrorCode().getMessage())
                        .build()
                );
    }
}
