package com.ssafy.membermanage.memberLocation.service;

import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.memberLocation.db.MemberLocation;

import java.util.List;

public interface MemberLocationService {
    List<MemberLocation> findAllByMember(Member member);
    MemberLocation save(MemberLocation memberLocation);
    void deleteByMemberAndLocationId(Member member, Short locationId);

}
