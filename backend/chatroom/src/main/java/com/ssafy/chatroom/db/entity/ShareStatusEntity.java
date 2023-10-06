package com.ssafy.chatroom.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name = "share_status")
@Builder
@Data
@IdClass(ShareStatusEntityPK.class)
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class ShareStatusEntity {
    @Id
    @Column(name = "member_id")
    Long memberId;

    @Id
    @Column(name = "chat_room_id")
    Integer chatRoomId;

    @Column(name = "share_status")
    Boolean shareStatus;

}
