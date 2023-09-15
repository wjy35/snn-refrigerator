package com.ssafy.membermanage.followPerson.db;

import com.ssafy.membermanage.member.db.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class FollowMember{
    @Id
    @Column(name = "follow_member_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer followId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followee", referencedColumnName = "member_id")
    private Member followee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower", referencedColumnName = "member_id")
    private Member follower;
}
