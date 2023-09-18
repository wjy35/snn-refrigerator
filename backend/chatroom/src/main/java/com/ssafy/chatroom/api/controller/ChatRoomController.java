package com.ssafy.chatroom.api.controller;

import com.ssafy.chatroom.api.mapper.ChatRoomMapper;
import com.ssafy.chatroom.api.request.ChatRoomCreateRequest;
import com.ssafy.chatroom.api.response.Response;
import com.ssafy.chatroom.service.ChatRoomCreateService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLIntegrityConstraintViolationException;

@RestController
@AllArgsConstructor
public class ChatRoomController {
    private final ChatRoomCreateService chatRoomCreateService;

    @PostMapping("/")
    ResponseEntity<Response> create(@RequestBody ChatRoomCreateRequest chatRoomCreateRequest){

        Integer chatRoomId = chatRoomCreateService
                .createAndGetChatRoomEntity(ChatRoomMapper.INSTANCE.requestToEntity(chatRoomCreateRequest))
                .getChatRoomId();

        Response response = Response
                .builder()
                .message("Created")
                .response("chatRoomId",chatRoomId)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    ResponseEntity<Response> handleChatRoomAlreadyExist(){
        Response response = Response
                .builder()
                .message("ChatRoom Already Exist")
                .build();
        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }


}
