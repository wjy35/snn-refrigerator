package com.ssafy.chatroom.api.controller;

import com.ssafy.chatroom.api.mapper.ChatRoomMapper;
import com.ssafy.chatroom.api.request.ChatRoomCreateRequest;
import com.ssafy.chatroom.api.response.ChatRoomSearchParam;
import com.ssafy.chatroom.api.response.Response;
import com.ssafy.chatroom.cloud.dto.ChatDto;
import com.ssafy.chatroom.db.entity.ChatRoomEntity;
import com.ssafy.chatroom.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequiredArgsConstructor
public class ChatRoomController {
    private final ChatRoomCreateService chatRoomCreateService;
    private final ChatRoomSearchService chatRoomSearchService;
    private final ChatMemberSearchService chatMemberSearchService;
    private final ChatShareBoardSearchService chatShareBoardSearchService;
    private final ViewCurrentChatService viewCurrentChatService;

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

    @GetMapping("/{memberId}")
    ResponseEntity<Response> view(@PathVariable Long memberId){
        List<ChatRoomSearchParam> chatRoomSearchParamList = new ArrayList<>();
        List<ChatRoomEntity> chatRoomEntityList = chatRoomSearchService.searchByMemberId(memberId);

        for(ChatRoomEntity chatRoomEntity : chatRoomEntityList){
            chatRoomSearchParamList.add(ChatRoomMapper.INSTANCE.toChatRoomSearchParam(
                    chatRoomEntity,
                    viewCurrentChatService.viewByChatRoomId(chatRoomEntity.getChatRoomId()),
                    chatShareBoardSearchService.searchByShareBoardId(chatRoomEntity.getSharePostId()),
                    chatMemberSearchService.searchByMemberId(chatRoomEntity.getReceiverMemberId())
            ));
        }

        Response response = Response
                .builder()
                .message("OK")
                .response("chatRoomList",chatRoomSearchParamList)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
