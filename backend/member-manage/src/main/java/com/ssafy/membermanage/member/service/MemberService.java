package com.ssafy.membermanage.member.service;

import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.house.db.House;
import com.ssafy.membermanage.house.db.HouseRepository;
import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.member.db.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private HouseRepository houseRepository;

    public Member modifyMemberHouse(Member member, String houseCode) throws CustomException{
        House house = houseRepository.findByHouseCode(houseCode)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_House));
        member.setHouse(house);
        return member;
    }

    public Optional<Member> findByMemberId(Long id){
        return memberRepository.findByMemberId(id);
    }

    public boolean existsByNickname(String nickname){
        return memberRepository.existsByNickname(nickname);
    }

    public Member save(Member member){
        return memberRepository.save(member);
    }
}
