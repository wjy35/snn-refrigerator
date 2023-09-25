package com.ssafy.chatroom.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.chatroom.cloud.dto.ShareBoardDto;
import com.ssafy.chatroom.cloud.openfeign.ShareBoardOpenFeign;
import com.ssafy.chatroom.service.ChatShareBoardSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ChatShareBoardSearchServiceImpl implements ChatShareBoardSearchService {
    private final ObjectMapper objectMapper;
    private final ShareBoardOpenFeign shareBoardOpenFeign;

    @Override
    public ShareBoardDto searchByShareBoardId(Integer shareBoardId) {
        return objectMapper.convertValue(
                shareBoardOpenFeign.getShareBoardDto(shareBoardId).getData().get("response"),
                ShareBoardDto.class);
    }
}
