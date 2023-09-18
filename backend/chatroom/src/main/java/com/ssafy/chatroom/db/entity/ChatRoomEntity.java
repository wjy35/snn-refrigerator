package com.ssafy.chatroom.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "chatroom")
public class ChatRoomEntity {
    @Id
    @Column(name = "chat_room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chatRoomId;

    @Column(name = "share_post_id")
    private Integer sharePostId;

    @Column(name = "sender_member_id")
    private Long senderMemberId;



    @Builder
    public ChatRoomEntity(Integer sharePostId, Long senderMemberId) {
        this.sharePostId = sharePostId;
        this.senderMemberId = senderMemberId;
    }
}
