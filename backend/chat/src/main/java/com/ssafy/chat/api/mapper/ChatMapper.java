package com.ssafy.chat.api.mapper;

import com.ssafy.chat.api.response.ChatParam;
import com.ssafy.chat.db.entity.ChatEntity;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import java.util.List;

@Mapper
public interface ChatMapper {
    ChatMapper INSTANCE = Mappers.getMapper(ChatMapper.class);

    @Named("ENTITY_TO_PARAM")
    ChatParam entityToParam(ChatEntity chatEntity);

    @IterableMapping(qualifiedByName = "ENTITY_TO_PARAM")
    List<ChatParam> entityListtoParamList(List<ChatEntity> chatEntityList);
}
