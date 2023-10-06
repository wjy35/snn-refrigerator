package com.ssafy.chatroom.db.repository;

import com.ssafy.chatroom.db.entity.ChatRoomEntity;
import com.ssafy.chatroom.db.entity.ChatRoomEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, ChatRoomEntityPK> {
    Optional<ChatRoomEntity> findChatRoomEntityBySharePostIdAndAndSenderMemberId(Integer sharePostId,Long senderMemberId);
    List<ChatRoomEntity> findAllBySenderMemberIdOrReceiverMemberId(Long senderMemberId,Long receiverMemberId);
}
