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
@IdClass(ChatRoomEntityPK.class)
public class ChatRoomEntity {
    @Column(name = "chat_room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chatRoomId;

    @Id
    @Column(name = "share_post_id")
    private Integer sharePostId;

    @Id
    @Column(name = "sender_member_id")
    private Long senderMemberId;

    @Builder
    public ChatRoomEntity(Integer sharePostId, Long senderMemberId) {
        this.sharePostId = sharePostId;
        this.senderMemberId = senderMemberId;
    }
}
