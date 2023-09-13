package com.ssafy.membermanage.member.api;

import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.member.db.MemberRepository;
import com.ssafy.membermanage.member.dto.CheckNicknameIsDuplicateDto;
import com.ssafy.membermanage.member.dto.GetInfoDto;
import com.ssafy.membermanage.member.dto.SingleNicknameDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.Optional;

import java.util.Optional;

@RestController
@RequestMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
public class MemberController {
    @Autowired
    private MemberRepository memberRepository;

    @GetMapping("/{memberId}")
    public ResponseEntity<GetInfoDto> getMemberInfo(@PathVariable Long memberId){
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        return ResponseEntity.ok(new GetInfoDto(
                member.getNickname(),
                member.getProfileImageUrl(),
                member.getBirthday(),
                member.getEmail(),
                member.getHouse().getHouseCode(),
                member.getFollowCount()
        ));
    }

    @PostMapping("/check-duplicate")
    public ResponseEntity<CheckNicknameIsDuplicateDto> checkDuplicate(@RequestParam("nickname") String nickname){
        if(memberRepository.existsByNickname(nickname).equals(false)){
            return ResponseEntity.ok(new CheckNicknameIsDuplicateDto("Unique nickname.", nickname));
        }
        else{
            return new ResponseEntity<CheckNicknameIsDuplicateDto>(
                    new CheckNicknameIsDuplicateDto("Already exists", nickname),
                    HttpStatus.CONFLICT
            );
        }
    }

    @PutMapping("/{memberId}")
    public ResponseEntity<SingleNicknameDto> modifyMemberInfo(@RequestParam("nickname") String nickname, @PathVariable Long memberId){
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        if(memberRepository.existsByNickname(nickname).equals(true)) throw new CustomException(ErrorCode.Duplicate_Nickname);
        return ResponseEntity.ok(new SingleNicknameDto(member.getNickname()));
    }

    @PostMapping("/{memberId}/hate-ingredient/{ingredient}")
    public ResponseEntity<?>addInedibleIngredient(@PathVariable Long memberId, @PathVariable String ingredient){
        return ResponseEntity.ok("");
    }
}
