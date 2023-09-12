package com.ssafy.share.api.mapper;


import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.db.entity.SharePost;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface ShareBoardMapper {
    ShareBoardMapper INSTANCE = Mappers.getMapper(ShareBoardMapper.class);

    @Mappings({
            @Mapping(target = "thumbnail", ignore = true),
            @Mapping(target = "shareImages", ignore = true),
            @Mapping(target = "shareIngredients", ignore = true),
            @Mapping(target = "member", ignore = true),
            @Mapping(target = "locationInfo", ignore = true)
    })
    SharePost postWriteRequestToPost(ShareBoardWriteRequest request);
}
