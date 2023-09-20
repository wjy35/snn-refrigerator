package com.ssafy.membermanage.member.db;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberId(Long memberId);

    boolean existsByNickname(String nickname);

    Member save(Member member);

    void deleteByMemberId(Long memberId);
}
