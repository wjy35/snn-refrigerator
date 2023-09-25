package com.ssafy.chatroom.service;

import com.ssafy.chatroom.cloud.dto.ShareBoardDto;

public interface ChatShareBoardSearchService {
    ShareBoardDto searchByShareBoardId(Integer shareBoardId);
}
