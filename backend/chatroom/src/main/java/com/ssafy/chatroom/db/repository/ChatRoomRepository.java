package com.ssafy.chatroom.db.repository;

import com.ssafy.chatroom.db.entity.ChatRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity,Integer> {
}
