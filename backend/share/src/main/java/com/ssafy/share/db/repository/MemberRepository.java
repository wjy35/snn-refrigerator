package com.ssafy.share.db.repository;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Optional;

@Repository
public class MemberRepository { // 여기엔 Member 엔티티가 없기 때문에 네이티브 쿼리로 조회함

    @PersistenceContext
    EntityManager em;

    public Optional<String> findNicknameByMemberId(Long memberId) { // memberId로 회원 단건 조회
        String sql = "select nickname from member where member_id = ?";
        Object result = em.createNativeQuery(sql).setParameter(1,memberId).getSingleResult();
        return Optional.ofNullable(result != null ? result.toString() : null);
    }

}
