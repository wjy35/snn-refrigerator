package com.ssafy.ingredientextract.ingredient.service;

import com.ssafy.ingredientextract.ingredient.db.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@RequiredArgsConstructor
public class IngredientServiceImpl {
    private final IngredientRepository ingredientRepository;
    //TODO: PostConstruct로 식재료 불러와서 Trie에 주입하는 것 추가
    //TODO: 식재료 개별 추가 구현(Trie에 식재료 추가, dict에 추가)

}
