package com.ssafy.membermanage.followPerson.service;

import com.ssafy.membermanage.aws.utils.S3helper;
import com.ssafy.membermanage.followPerson.db.FollowMember;
import com.ssafy.membermanage.followPerson.db.FollowMemberRepository;
import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.member.db.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FollowServiceImpl {
    @Autowired
    private FollowMemberRepository followMemberRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private S3helper s3helper;

    public boolean followOrUnfollow(Member follower, Member followee){

        Integer followCount = followee.getFollowCount();
        boolean flag;

        if(followMemberRepository.existsByFollowerAndFollowee(follower, followee).equals(true)){
            FollowMember followMember = followMemberRepository.findAllByFollowerAndFollowee(follower, followee).get(0);
            followee.setFollowCount(followCount - 1);
            followMemberRepository.deleteByFollowId(followMember.getFollowId()); //followMember 삭제
            flag = false;
        }
        else{
            followee.setFollowCount(followCount + 1);
            FollowMember followMember = new FollowMember();
            followMember.setFollower(follower);
            followMember.setFollowee(followee);

            followMemberRepository.save(followMember); //followMember 생성
            flag = true;
        }
        memberRepository.save(followee); //followee 업데이트
        return flag;
    }

    public List<Map<String, Object>> getFolloweeList(Member follower){
        List<FollowMember> queryList = followMemberRepository.findByFollower(follower);
        System.out.println(queryList.toString());
        List<Map<String, Object>> followees = new ArrayList<>();
        for(FollowMember followMember : queryList){
            Member followee = followMember.getFollowee();
            Map<String, Object> info = new HashMap<>();
            info.put("memberId", followee.getMemberId());
            info.put("nickname", followee.getNickname());
            info.put("profileImageUrl", s3helper.getS3ImageUrl(followee.getProfileImageFilename()));
            info.put("followCount", followee.getFollowCount());

            followees.add(info);
        }
        return followees;
    }
}
