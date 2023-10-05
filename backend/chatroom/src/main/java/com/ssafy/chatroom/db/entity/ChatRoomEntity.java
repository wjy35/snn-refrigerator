package com.ssafy.chatroom.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenerationTime;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chatroom")
@IdClass(ChatRoomEntityPK.class)
@ToString
public class ChatRoomEntity {
    @Column(name = "chat_room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.hibernate.annotations.Generated(GenerationTime.INSERT)
    private Integer chatRoomId;

    @Id
    @Column(name = "share_post_id")
    private Integer sharePostId;

    @Id
    @Column(name = "sender_member_id")
    private Long senderMemberId;

    @Id
    @Column(name = "receiver_member_id")
    private Long receiverMemberId;

    @Builder
    public ChatRoomEntity(Integer sharePostId, Long senderMemberId, Long receiverMemberId) {
        this.sharePostId = sharePostId;
        this.senderMemberId = senderMemberId;
        this.receiverMemberId = receiverMemberId;
    }
}
