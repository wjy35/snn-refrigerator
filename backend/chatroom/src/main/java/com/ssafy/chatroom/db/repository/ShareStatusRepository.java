package com.ssafy.chatroom.db.repository;

import com.ssafy.chatroom.db.entity.ShareStatusEntity;
import com.ssafy.chatroom.db.entity.ShareStatusEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShareStatusRepository extends JpaRepository<ShareStatusEntity, ShareStatusEntityPK> {
    List<ShareStatusEntity> findAllByChatRoomIdAndShareStatusIsTrue(Integer chatRoomId);
}
