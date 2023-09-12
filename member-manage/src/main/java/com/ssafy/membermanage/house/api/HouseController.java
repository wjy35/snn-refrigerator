package com.ssafy.membermanage.house.api;

import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.member.db.Member;

import com.ssafy.membermanage.house.db.House;
import com.ssafy.membermanage.house.db.HouseRepository;
import com.ssafy.membermanage.house.dto.CheckHouseDto;
import com.ssafy.membermanage.house.dto.CreateHouseDto;
import com.ssafy.membermanage.house.dto.ModifyMemberHouseDto;
import com.ssafy.membermanage.house.service.HouseService;
import com.ssafy.membermanage.member.db.MemberRepository;
import com.ssafy.membermanage.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/house")
public class HouseController {

    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private HouseService houseService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberService memberService;


    @PostMapping("")
    public ResponseEntity<CreateHouseDto> createHouse(){
        House house = houseService.createHouse();
        return ResponseEntity.ok(new CreateHouseDto(house.getHouseCode()));
    }

    @GetMapping("/{houseCode}")
    public ResponseEntity<CheckHouseDto> checkHouse(@PathVariable String houseCode){
        Boolean flag = houseRepository.existsByHouseCode(houseCode);
        if(flag.equals(true)){
            return ResponseEntity.ok(new CheckHouseDto("YES"));
        }
        else{
            return ResponseEntity.ok(new CheckHouseDto("NO"));
        }
    }

    @PutMapping("")
    public ResponseEntity<ModifyMemberHouseDto> modifyMemberHouse(@RequestBody ModifyMemberHouseDto request){
        Long memberId = request.getMemberId();
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        String houseCode = request.getHouseCode();
        member = memberService.modifyMemberHouse(member, houseCode);
        return ResponseEntity.ok(new ModifyMemberHouseDto(member.getMemberId(), member.getHouse().getHouseCode()));
    }
}