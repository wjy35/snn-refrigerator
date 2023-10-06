package com.ssafy.alarm.db.repository;

import com.ssafy.alarm.db.entity.MemberFcmTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberFcmTokenRepository extends JpaRepository<MemberFcmTokenEntity,Long> {
    Optional<MemberFcmTokenEntity> findByMemberId(Long memberId);
}
