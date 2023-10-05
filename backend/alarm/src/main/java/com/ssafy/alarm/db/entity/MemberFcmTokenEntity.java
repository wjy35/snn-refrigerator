package com.ssafy.alarm.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "member_fcm_token")
public class MemberFcmTokenEntity {
    @Id
    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "member_fcm_token")
    private String memberFcmToken;

    public Long getMemberId() {
        return memberId;
    }

    public String getMemberFcmToken() {
        return memberFcmToken;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public void setMemberFcmToken(String memberFcmToken) {
        this.memberFcmToken = memberFcmToken;
    }
}
