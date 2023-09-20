package com.ssafy.membermanage.member.db;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberId(Long memberId);

    boolean existsByNickname(String nickname);

    Member save(Member member);
}
