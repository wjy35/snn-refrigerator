package com.ssafy.membermanage.followPerson.service;

import com.ssafy.membermanage.member.db.Member;

import java.util.List;
import java.util.Map;

public interface FollowService {
    boolean followOrUnfollow(Member follower, Member followee);
    List<Map<String, Object>> getFolloweeList(Member follower);
}
