package com.ssafy.membermanage.followPerson.api;

import com.ssafy.membermanage.followPerson.service.FollowService;
import com.ssafy.membermanage.member.db.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/follow")
public class FollowController {
    @Autowired
    private FollowService followService;

    @Autowired
    private MemberRepository memberRepository;

}
