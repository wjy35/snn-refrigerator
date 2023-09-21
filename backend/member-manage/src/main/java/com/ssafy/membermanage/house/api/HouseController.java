package com.ssafy.membermanage.house.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.member.db.Member;

import com.ssafy.membermanage.house.dto.ModifyMemberHouseDto;
import com.ssafy.membermanage.member.db.MemberRepository;
import com.ssafy.membermanage.member.service.MemberServiceImpl;
import com.ssafy.membermanage.response.Response;
import com.ssafy.membermanage.response.ResponseViews;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/house")
public class HouseController {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberServiceImpl memberService;


    @PostMapping("")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> createHouse(){
        String houseCode = memberService.createHouseCode();

        Map<String, Object> data = new HashMap<>();
        data.put("houseCode", houseCode);

        Response response = Response.
                builder().
                message("OK").
                data(data).
                build();
        return ResponseEntity.ok(response);
    }//OK

    @GetMapping("/{houseCode}")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> checkHouse(@PathVariable String houseCode){
        boolean flag = memberService.existsByHouseCode(houseCode);
        Map<String, Object> data = new HashMap<>();
        data.put("existance", flag);

        Response response = Response.
                builder().
                message("OK").
                data(data).
                build();
        return ResponseEntity.ok(response);
    }//OK

    @PutMapping("")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> modifyMemberHouse(@RequestBody ModifyMemberHouseDto request){
        Long memberId = request.getMemberId();
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        String houseCode = request.getHouseCode();
        member = memberService.modifyMemberHouse(member, houseCode);
        memberService.save(member);

        Map<String, Object> houseInfo = new HashMap<>();
        houseInfo.put("memberId", memberId);
        houseInfo.put("houseCode", houseCode);

        Map<String, Object> data = new HashMap<>();
        data.put("houseInfo", houseInfo);

        Response response = Response.
                builder().
                message("OK").
                data(data).
                build();
        return ResponseEntity.ok(response);
    }//OK
}