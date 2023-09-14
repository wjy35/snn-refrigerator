package com.ssafy.membermanage.followPerson.service;

import com.ssafy.membermanage.followPerson.db.FollowMember;
import com.ssafy.membermanage.followPerson.db.FollowMemberRepository;
import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.member.db.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowService {
    @Autowired
    private FollowMemberRepository followMemberRepository;

    @Autowired
    private MemberRepository memberRepository;

    public boolean followOrUnfollow(Member follower, Member followee){

        Integer followCount = followee.getFollowCount();
        boolean flag;

        if(followMemberRepository.existsByFollowerAndFollowee(follower, followee).equals(true)){
            FollowMember followMember = followMemberRepository.findByFollowerAndFollowee(follower, followee).get(0);
            followee.setFollowCount(followCount - 1);
            followMemberRepository.deleteByFollowId(followMember.getFollowId()); //followMember 삭제
            flag = true;
        }
        else{
            followee.setFollowCount(followCount + 1);
            FollowMember followMember = new FollowMember();
            followMember.setFollower(follower);
            followMember.setFollowee(followee);

            followMemberRepository.save(followMember); //followMember 생성
            flag = false;
        }
        memberRepository.save(followee); //followee 업데이트
        return flag;
    }
}
