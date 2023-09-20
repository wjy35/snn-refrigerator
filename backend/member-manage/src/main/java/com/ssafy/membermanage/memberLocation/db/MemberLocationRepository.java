package com.ssafy.membermanage.memberLocation.db;

import com.ssafy.membermanage.member.db.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface MemberLocationRepository extends JpaRepository<MemberLocation, Integer> {
    List<MemberLocation> findAllByMember(Member member);

    MemberLocation save(MemberLocation memberLocation);

    void deleteByMemberAndLocationId(Member member, Short locationId);
}
