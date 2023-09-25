package com.ssafy.chatroom.api.mapper;

import com.ssafy.chatroom.api.request.ChatRoomCreateRequest;
import com.ssafy.chatroom.api.response.ChatRoomCreateResponse;
import com.ssafy.chatroom.api.response.ChatRoomSearchParam;
import com.ssafy.chatroom.cloud.dto.ChatDto;
import com.ssafy.chatroom.cloud.dto.MemberDto;
import com.ssafy.chatroom.cloud.dto.ShareBoardDto;
import com.ssafy.chatroom.db.entity.ChatRoomEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

import static org.springframework.core.convert.TypeDescriptor.map;

@Mapper
public interface ChatRoomMapper {
    ChatRoomMapper INSTANCE = Mappers.getMapper(ChatRoomMapper.class);

    ChatRoomCreateResponse entityToResponse(ChatRoomEntity chatRoomEntity);
    ChatRoomEntity requestToEntity(ChatRoomCreateRequest chatRoomCreateRequest);

    @Mapping(target="thumbnailImageUrl", expression = "java(shareBoardDto.getShareImages().get(0))")
    ChatRoomSearchParam toChatRoomSearchParam(
            ChatRoomEntity chatRoomEntity,
            ChatDto chatDto,
            ShareBoardDto shareBoardDto,
            MemberDto memberDto
            );
}
