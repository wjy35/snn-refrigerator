package com.ssafy.ingredientextract.ingredient.db;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient, Short> {
    Ingredient save(Ingredient ingredient);

    List<Ingredient> findAll();
}
