package com.ssafy.chatroom.service;

import com.ssafy.chatroom.db.entity.ShareStatusEntity;

import java.util.Optional;

public interface ShareStatusService {
    Integer getShareStatusByChatRoomIdAndMemberId(Integer chatRoomId,Long memberId);
    void saveByShareStatusEntity(ShareStatusEntity shareStatusEntity);
}
