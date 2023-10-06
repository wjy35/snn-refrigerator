package com.ssafy.chatroom.api.controller;

import com.ssafy.chatroom.api.mapper.ChatRoomMapper;
import com.ssafy.chatroom.api.mapper.ShareStatusMapper;
import com.ssafy.chatroom.api.request.ChatRoomCreateRequest;
import com.ssafy.chatroom.api.request.ShareStatusRequest;
import com.ssafy.chatroom.api.response.ChatRoomSearchParam;
import com.ssafy.chatroom.api.response.Response;
import com.ssafy.chatroom.cloud.dto.ChatDto;
import com.ssafy.chatroom.db.entity.ChatRoomEntity;
import com.ssafy.chatroom.service.*;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
public class ChatRoomController {
    private final ChatRoomCreateService chatRoomCreateService;
    private final ChatRoomSearchService chatRoomSearchService;
    private final ChatMemberSearchService chatMemberSearchService;
    private final ChatShareBoardSearchService chatShareBoardSearchService;
    private final ViewCurrentChatService viewCurrentChatService;
    private final ShareStatusService shareStatusService;

    @PostMapping("/")
    ResponseEntity<Response> create(@RequestBody ChatRoomCreateRequest chatRoomCreateRequest){

        Integer chatRoomId = chatRoomCreateService
                .createAndGetChatRoomEntity(ChatRoomMapper.INSTANCE.requestToEntity(chatRoomCreateRequest));

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
            ChatDto chatDto = viewCurrentChatService.viewByChatRoomId(chatRoomEntity.getChatRoomId());

            chatRoomSearchParamList.add(ChatRoomMapper.INSTANCE.toChatRoomSearchParam(
                    chatRoomEntity,
                    chatDto,
                    chatShareBoardSearchService.searchByShareBoardId(chatRoomEntity.getSharePostId()),
                    chatMemberSearchService.searchByMemberId(chatDto.getMemberId())
            ));
        }

        Response response = Response
                .builder()
                .message("OK")
                .response("chatRoomList",chatRoomSearchParamList)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/search/{sharePostId}/{memberId}")
    ResponseEntity<Response> search(@PathVariable Integer sharePostId,@PathVariable Long memberId){

        Optional<ChatRoomEntity> chatRoomEntity = chatRoomSearchService.searchBySharePostIdAndSenderMemberId(sharePostId, memberId);
        if(chatRoomEntity.isPresent()){
            Response response = Response
                    .builder()
                    .message("OK")
                    .response("chatRoom",chatRoomEntity.get())
                    .build();

            return new ResponseEntity<>(response,HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/shareStatus/{chatRoomId}/{memberId}")
    ResponseEntity<Response> viewShareStatus(@PathVariable Integer chatRoomId,@PathVariable Long memberId){
        Integer shareStatus = shareStatusService.getShareStatusByChatRoomIdAndMemberId(chatRoomId,memberId);

        Response response = Response
                .builder()
                .message("OK")
                .response("shareStatus",shareStatus)
                .build();

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PutMapping("/")
    ResponseEntity<Response> updateShareStatus(@RequestBody ShareStatusRequest shareStatusRequest){
        shareStatusService.saveByShareStatusEntity(
                ShareStatusMapper.INSTANCE.requestToEntity(shareStatusRequest)
        );
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
