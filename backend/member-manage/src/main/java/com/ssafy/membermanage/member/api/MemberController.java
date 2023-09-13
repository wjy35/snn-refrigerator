package com.ssafy.membermanage.member.api;

import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.hateIngredient.db.HateIngredient;
import com.ssafy.membermanage.hateIngredient.db.HateIngredientRepository;
import com.ssafy.membermanage.hateIngredient.service.HateIngredientService;
import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.member.db.MemberRepository;
import com.ssafy.membermanage.member.dto.*;
import com.ssafy.membermanage.requestApi.client.RequestIngredientApiClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
public class MemberController {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private HateIngredientRepository hateIngredientRepository;

    @Autowired
    private HateIngredientService hateIngredientService;



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
}
