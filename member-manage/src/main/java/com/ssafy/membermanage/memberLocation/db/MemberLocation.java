package com.ssafy.membermanage.memberLocation.db;

import com.ssafy.membermanage.house.db.House;
import com.ssafy.membermanage.member.db.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MemberLocation {
    @Id
    @Column(name = "member_location_seq")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int memberLocationSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "location_id")
    private int locationId;
}
