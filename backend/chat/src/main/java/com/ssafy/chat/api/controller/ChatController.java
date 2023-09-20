package com.ssafy.chat.api.controller;

import com.ssafy.chat.api.mapper.ChatMapper;
import com.ssafy.chat.api.response.ChatParam;
import com.ssafy.chat.api.response.Response;
import com.ssafy.chat.service.ChatViewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ChatController {
    private final ChatViewService chatViewService;

    @GetMapping("/all/{chatRoomId}")
    ResponseEntity<Response> viewAll(@PathVariable Integer chatRoomId){
        List<ChatParam> chatParamList = ChatMapper.INSTANCE
                .entityListtoParamList(chatViewService.viewAllChat(chatRoomId));

        Response response = Response
                .builder()
                .request(chatRoomId.toString())
                .message("OK")
                .response("chatList",chatParamList)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{chatRoomId}")
    ResponseEntity<Response> viewCurrentChat(@PathVariable Integer chatRoomId){
        ChatParam chatParam = ChatMapper.INSTANCE
                .entityToParam(chatViewService.viewCurrentChat(chatRoomId));

        Response response = Response
                .builder()
                .request(chatRoomId.toString())
                .message("OK")
                .response("chat",chatParam)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
