package com.ssafy.chatroom.api.mapper;

import com.ssafy.chatroom.api.request.ChatRoomCreateRequest;
import com.ssafy.chatroom.api.response.ChatRoomCreateResponse;
import com.ssafy.chatroom.db.entity.ChatRoomEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ChatRoomMapper {
    ChatRoomMapper INSTANCE = Mappers.getMapper(ChatRoomMapper.class);

    ChatRoomCreateResponse entityToResponse(ChatRoomEntity chatRoomEntity);
    ChatRoomEntity requestToEntity(ChatRoomCreateRequest chatRoomCreateRequest);
}
