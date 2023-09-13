package com.ssafy.membermanage.hateIngredient.db;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HateIngredientRepository extends JpaRepository<HateIngredient, Integer> {
    HateIngredient save(HateIngredient hateIngredient);
}
