package com.ssafy.ingredientautocomplete.service;

import com.ssafy.ingredientautocomplete.db.entity.IngredientInfoEntity;

import java.util.List;

public interface IngredientAutocompleteService {

    List<IngredientInfoEntity> startWith(String keyword);
}
