package com.ssafy.membermanage.memberLocation.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.member.service.MemberServiceImpl;
import com.ssafy.membermanage.memberLocation.db.MemberLocation;
import com.ssafy.membermanage.memberLocation.dto.LocationInfo;
import com.ssafy.membermanage.memberLocation.request.SingleLocationRequest;
import com.ssafy.membermanage.memberLocation.service.MemberLocationServiceImpl;
import com.ssafy.membermanage.response.Response;
import com.ssafy.membermanage.response.ResponseViews;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class MemberLocationController {

    private final MemberLocationServiceImpl memberLocationService;

    private final MemberServiceImpl memberServiceImpl;

    @PostMapping("/{memberId}/location")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> postMemberLocation(@PathVariable Long memberId, @RequestBody SingleLocationRequest request){
        Member member = memberServiceImpl.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        Short locationId = request.getLocationId();
        if(locationId == null) throw new CustomException(ErrorCode.Wrong_LocationId);

        MemberLocation memberLocation = MemberLocation
                .builder()
                .member(member)
                .locationId(locationId)
                .build();
        memberLocation = memberLocationService.save(memberLocation);
        Map<String, Object> locationInfo = new HashMap<>();
        locationInfo.put("locationId", locationId);
        locationInfo.put("locationName", memberLocationService.getLocationName(locationId));

        Map<String, Object> data = new HashMap<>();
        data.put("location", locationInfo);

        Response response = Response
                .builder()
                .message("ok")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{memberId}/location")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> getMemberLocation(@PathVariable Long memberId){

        Member member = memberServiceImpl.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        List<LocationInfo> locationInfos = memberLocationService.getLocations(member);

        Map<String, Object> data = new HashMap<>();
        data.put("location", locationInfos);

        Response response = Response
                .builder()
                .message("ok")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{memberId}/location/{locationId}")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> deleteMemberLocation(@PathVariable Long memberId, @PathVariable Short locationId){

        Member member = memberServiceImpl.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        memberLocationService.deleteByMemberAndLocationId(member, locationId);

        Map<String, Object> data = new HashMap<>();
        data.put("status", true);

        Response response = Response
                 .builder()
                .message("ok")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }
}
