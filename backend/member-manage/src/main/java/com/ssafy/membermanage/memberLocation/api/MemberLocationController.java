package com.ssafy.membermanage.memberLocation.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.member.service.MemberService;
import com.ssafy.membermanage.memberLocation.db.MemberLocation;
import com.ssafy.membermanage.memberLocation.dto.LocationInfo;
import com.ssafy.membermanage.memberLocation.request.SingleLocationRequest;
import com.ssafy.membermanage.memberLocation.service.MemberLocationServiceImpl;
import com.ssafy.membermanage.response.ResponseDto;
import com.ssafy.membermanage.response.ResponseViews;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class MemberLocationController {

    private final MemberLocationServiceImpl memberLocationService;

    private final MemberService memberService;

    @PostMapping("/{memberId}/location")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<ResponseDto> postMemberLocation(@PathVariable Long memberId, @RequestBody SingleLocationRequest request){
        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        Short locationId = request.getLocationId();

        MemberLocation memberLocation = MemberLocation
                .builder()
                .member(member)
                .locationId(locationId)
                .build();

        LocationInfo locationInfo = LocationInfo
                .builder()
                .locationId(locationId)
                .locationName(memberLocationService.getLocationName(locationId))
                .build();

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("location", locationInfo);

        ResponseDto response = ResponseDto
                .builder()
                .message("ok")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{memberId}/location")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<ResponseDto> getMemberLocation(@PathVariable Long memberId){

        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("status", true);

        ResponseDto response = ResponseDto
                .builder()
                .message("ok")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{memberId}/location")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<ResponseDto> deleteMemberLocation(@PathVariable Long memberId){

        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("status", true);

        ResponseDto response = ResponseDto
                .builder()
                .message("ok")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }
}
