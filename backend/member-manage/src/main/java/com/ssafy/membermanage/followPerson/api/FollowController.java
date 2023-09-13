package com.ssafy.membermanage.followPerson.api;

import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.followPerson.dto.FollowRequestDto;
import com.ssafy.membermanage.followPerson.dto.FollowResponseDto;
import com.ssafy.membermanage.followPerson.service.FollowService;
import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.member.db.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/follow")
public class FollowController {
    @Autowired
    private FollowService followService;

    @Autowired
    private MemberRepository memberRepository;


    @PostMapping("/follow")
    public ResponseEntity<FollowResponseDto> ResponseFollowOrUnfollow(@RequestBody FollowRequestDto request){
        Member follower = memberRepository.findByMemberId(request.getFollowerId())
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        Member followee = memberRepository.findByMemberId(request.getFolloweeId())
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        Boolean flag = followService.followOrUnfollow(follower, followee);
        String message = (flag.equals(true)) ? "Follow" : "UnFollow";

        return ResponseEntity.ok(new FollowResponseDto(
                request.getFollowerId(),
                request.getFolloweeId(),
                message
        ));
    }
}
