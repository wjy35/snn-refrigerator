package com.ssafy.membermanage.hateIngredient.db;

import com.ssafy.membermanage.member.db.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface HateIngredientRepository extends JpaRepository<HateIngredient, Integer> {
    HateIngredient save(HateIngredient hateIngredient);

    List<HateIngredient> findByMember(Member member);

    List<HateIngredient> findByMemberAndIngredientId(Member member, Short ingredientId);
}
