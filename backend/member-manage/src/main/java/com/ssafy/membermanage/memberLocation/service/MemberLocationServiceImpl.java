package com.ssafy.membermanage.memberLocation.service;

import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.memberLocation.db.MemberLocation;
import com.ssafy.membermanage.memberLocation.db.MemberLocationRepository;
import com.ssafy.membermanage.requestApi.client.RequestLocationApiClident;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MemberLocationServiceImpl {

    private final MemberLocationRepository memberLocationRepository;

    private final RequestLocationApiClident requestLocationApiClient;

    public List<MemberLocation> findAllByMember(Member member){
        return memberLocationRepository.findAllByMember(member);
    }

    public MemberLocation save(MemberLocation memberLocation){
        return memberLocationRepository.save(memberLocation);
    }

    public void deleteByMemberAndLocationId(Member member, Short locationId){
        memberLocationRepository.deleteByMemberAndLocationId(member, locationId);
    };

    public String getLocationName(Short locationId){
        Map<String, Object> response = requestLocationApiClient.getLocationName(locationId);
        Map<String, Object> data = (Map<String, Object>) response.get("data");
        return (String) data.get("locationName");
    }
}
