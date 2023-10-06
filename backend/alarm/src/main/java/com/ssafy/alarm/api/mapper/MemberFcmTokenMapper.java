package com.ssafy.alarm.api.mapper;

import com.ssafy.alarm.api.request.MemberFcmTokenSaveRequest;
import com.ssafy.alarm.db.entity.MemberFcmTokenEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MemberFcmTokenMapper {
    MemberFcmTokenMapper INSTANCE = Mappers.getMapper(MemberFcmTokenMapper.class);

    MemberFcmTokenEntity requestToEntity(MemberFcmTokenSaveRequest memberFcmTokenSaveRequest);
}
