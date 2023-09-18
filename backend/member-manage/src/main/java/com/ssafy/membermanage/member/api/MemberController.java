package com.ssafy.membermanage.member.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.followPerson.service.FollowService;
import com.ssafy.membermanage.hateIngredient.db.HateIngredient;
import com.ssafy.membermanage.hateIngredient.db.HateIngredientRepository;
import com.ssafy.membermanage.hateIngredient.service.HateIngredientService;
import com.ssafy.membermanage.member.MemberViews;
import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.member.db.MemberRepository;
import com.ssafy.membermanage.member.dto.*;
import com.ssafy.membermanage.response.ResponseDto;
import com.ssafy.membermanage.response.ResponseViews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
public class MemberController {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private HateIngredientRepository hateIngredientRepository;

    @Autowired
    private HateIngredientService hateIngredientService;

    @Autowired
    private FollowService followService;


    @GetMapping("/{memberId}")
    @JsonView(MemberViews.Private.class)
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
    @JsonView(MemberViews.Private.class)
    public ResponseEntity<SingleNicknameDto> modifyMemberInfo(@RequestParam("nickname") String nickname, @PathVariable Long memberId){
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        if(memberRepository.existsByNickname(nickname).equals(true)) throw new CustomException(ErrorCode.Duplicate_Nickname);
        return ResponseEntity.ok(new SingleNicknameDto(member.getNickname()));
    }

    @PostMapping("/{memberId}/hate-ingredient/{ingredientId}")
    public ResponseEntity<HateIngredientDto> addInedibleIngredient(@PathVariable Long memberId, @PathVariable Short ingredientId){
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));


        String ingredientName = hateIngredientService.ingredientName(ingredientId);
        HateIngredientDto response = new HateIngredientDto(ingredientId, ingredientName);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{memberId}/hate-ingredient")
    public ResponseEntity<HateIngredientListDto> getInedibleIngredientList(@PathVariable Long memberId){
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        List<HateIngredient> ingredientList = hateIngredientRepository.findByMember(member);
        List<String> ingredientNames = new ArrayList<String>();
        Map<String, Object> apiresponse = new HashMap<String, Object>();
        for(HateIngredient ingredient : ingredientList){
            Short id = ingredient.getIngredientId();
            String name = hateIngredientService.ingredientName(id);
            ingredientNames.add(name);
        }
        HateIngredientListDto response = new HateIngredientListDto(ingredientNames);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{memberId}/hate-ingredient/{ingredientId}")
    public ResponseEntity<SimpleResponseDto> deleteInedibleIngredient(@PathVariable Long memberId, @PathVariable Short ingredientId){
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        List<HateIngredient> ingredientList = hateIngredientRepository.findByMemberAndIngredientId(member, ingredientId);
        for(HateIngredient ingredient : ingredientList){
            Integer id = ingredient.getHateIngredientTblId();
            hateIngredientRepository.deleteByHateIngredientTblId(id);
        }
        SimpleResponseDto response = new SimpleResponseDto("Deleted");
        return ResponseEntity.ok(response);
    }

    @PostMapping("{followerId}/follow/{followeeId}")
    public ResponseEntity<ResponseDto> ResponseFollowOrUnfollow(@PathVariable Long followerId, @PathVariable Long followeeId){
        Member follower = memberRepository.findByMemberId(followerId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        Member followee = memberRepository.findByMemberId(followeeId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        boolean flag = followService.followOrUnfollow(follower, followee);
        //data 내용 작성
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("flag", flag);

        //response
        ResponseDto response = ResponseDto
                .builder()
                .message("ok")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("{memberId}/follow")
    @JsonView(ResponseViews.Show.class)
    public ResponseEntity<ResponseDto> getFolloweeList(@PathVariable Long memberId){
        Member follower = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        List<GetInfoDto> followees = followService.getFolloweeList(follower);
        //data 내용 작성
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("followees", followees);

        //response
        ResponseDto response = ResponseDto
                .builder()
                .message("ok")
                .data(data)
                .build();

        return ResponseEntity.ok(response);
    }

//    @PostMapping("")
}
