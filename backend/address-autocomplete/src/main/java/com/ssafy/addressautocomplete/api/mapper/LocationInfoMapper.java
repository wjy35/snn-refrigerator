package com.ssafy.addressautocomplete.api.mapper;

import com.ssafy.addressautocomplete.api.response.LocationInfoResponse;
import com.ssafy.addressautocomplete.db.entity.LocationInfoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface LocationInfoMapper {
    LocationInfoMapper INSTANCE = Mappers.getMapper(LocationInfoMapper.class);
    LocationInfoResponse entityToResponse(LocationInfoEntity locationInfoEntity);
    List<LocationInfoResponse> entityToResponse(List<LocationInfoEntity> locationInfoEntities);
}
