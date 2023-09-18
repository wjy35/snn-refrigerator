package com.ssafy.chatroom.api.exception;

import com.ssafy.chatroom.api.response.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLIntegrityConstraintViolationException;

@RestControllerAdvice
public class ChatRoomControllerAdvise {
    @ExceptionHandler(RuntimeException.class)
    ResponseEntity<Response> handleNonCriticalException(){
        Response response = Response
                .builder()
                .message("Again Later!")
                .build();
        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }
}
