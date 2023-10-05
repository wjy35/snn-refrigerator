package com.ssafy.chatroom.api.mapper;

import com.ssafy.chatroom.api.request.ShareStatusRequest;
import com.ssafy.chatroom.db.entity.ShareStatusEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ShareStatusMapper {
    ShareStatusMapper INSTANCE = Mappers.getMapper(ShareStatusMapper.class);

    ShareStatusEntity requestToEntity(ShareStatusRequest shareStatusRequest);
}
