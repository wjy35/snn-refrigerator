package com.ssafy.membermanage.memberLocation.service;

import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.memberLocation.db.MemberLocation;
import com.ssafy.membermanage.memberLocation.db.MemberLocationRepository;
import com.ssafy.membermanage.memberLocation.dto.LocationInfo;
import com.ssafy.membermanage.feign.client.RequestLocationApiClident;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
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
    }

    public String getLocationName(Short locationId){
        System.out.println(locationId);
        Map<String, Object> response = requestLocationApiClient.getLocationName(locationId);
        Map<String, Object> data = (Map<String, Object>) response.get("data");

        return (String) data.get("locationName");
    }

    public List<Map<String, Object>> getLocations(Member member){
        List<MemberLocation> memberLocations = findAllByMember(member);

        List<Map<String, Object>> locations = new ArrayList<>();

        for(MemberLocation memberLocation: memberLocations){

            Short locationId = memberLocation.getLocationId();
            Map<String, Object> infos = new HashMap<>();
            infos.put("locationId", locationId);
            infos.put("locationName", getLocationName(locationId));
            locations.add(infos);
        }
        return locations;
    }
}
