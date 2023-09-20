package com.ssafy.membermanage.hateIngredient.service;


import com.ssafy.membermanage.hateIngredient.db.HateIngredient;
import com.ssafy.membermanage.member.db.Member;

import java.util.List;

public interface HateIngredientService {
    String ingredientName(Short id);
    HateIngredient save(HateIngredient hateIngredient);
    List<HateIngredient> findByMember(Member member);
    List<HateIngredient> findByMemberAndIngredientId(Member member, Short ingredientId);
    void deleteByHateIngredientTblId(Integer hateIngredientSeq);
}
