package com.ssafy.chatroom.service.impl;

import com.ssafy.chatroom.db.entity.ShareStatusEntity;
import com.ssafy.chatroom.db.repository.ShareStatusRepository;
import com.ssafy.chatroom.service.ShareStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShareStatusServiceImpl implements ShareStatusService {
    private final ShareStatusRepository shareStatusRepository;

    @Override
    public Integer getShareStatusByChatRoomIdAndMemberId(Integer chatRoomId, Long memberId) {
        List<ShareStatusEntity> shareStatusEntityList = shareStatusRepository.findAllByChatRoomIdAndShareStatusIsTrue(chatRoomId);

        if(shareStatusEntityList.isEmpty()) {
            return 0;
        } else if(shareStatusEntityList.size()==1 && shareStatusEntityList.get(0).getMemberId().equals(memberId)){
            return 1;
        } else if (shareStatusEntityList.size() == 1) {
            return 2;
        }

        return 3;
    }

    @Override
    public void saveByShareStatusEntity(ShareStatusEntity shareStatusEntity) {
        shareStatusRepository.save(shareStatusEntity);
    }
}
