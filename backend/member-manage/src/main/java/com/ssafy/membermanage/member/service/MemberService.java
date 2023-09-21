package com.ssafy.membermanage.member.service;

import com.ssafy.membermanage.member.db.Member;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

public interface MemberService {
    Member modifyMemberHouse(Member member, String houseCode);
    Optional<Member> findByMemberId(Long id);

    boolean existsByNickname(String nickname);
    Member save(Member member);

    boolean existsByHouseCode(String houseCode);
    void deleteByMemberId(Long id);
    String getToken(HttpServletRequest request);
    Long validateToken(HttpServletRequest request);
    boolean kakaoLogout(HttpServletRequest request, Long memberId);
}
