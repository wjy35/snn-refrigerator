package com.ssafy.membermanage.memberHateIngredient.db;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HateIngredientRepository extends JpaRepository<HateIngredient, Integer> {
    HateIngredient save(HateIngredient hateIngredient);
}
