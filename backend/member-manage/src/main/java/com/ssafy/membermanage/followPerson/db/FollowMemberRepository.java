package com.ssafy.membermanage.followPerson.db;

import com.ssafy.membermanage.member.db.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface FollowMemberRepository extends JpaRepository<FollowMember, Integer> {
    void deleteByFollowId(Integer followId);

    FollowMember save(FollowMember followMember);

    List<FollowMember> findByFollowee(Member followee);

    List<FollowMember> findByFollower(Member follower);

    Boolean existsByFollowerAndFollowee(Member follower, Member followee);

    List<FollowMember> findAllByFollowerAndFollowee(Member follower, Member followee);
}
