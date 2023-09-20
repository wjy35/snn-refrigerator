package com.ssafy.ingredientextract.ingredient.service;

import com.ssafy.ingredientextract.ingredient.db.Ingredient;
import com.ssafy.ingredientextract.ingredient.db.IngredientRepository;
import com.ssafy.ingredientextract.trie.Trie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IngredientServiceImpl {
    private final IngredientRepository ingredientRepository;

    private final Trie trie;
    @PostConstruct
    public void initSetting(){
        List<Ingredient> ingredients = ingredientRepository.findAll();

        //ingredient 트라이에 넣어두기
        for(Ingredient ingredient : ingredients){
            trie.addWord(ingredient.getIngredientInfoId(), ingredient.getIngredientInfoName());
        }

        trie.bfs(); //fail 함수 전파
    }

    //ingredient 추가 api가 있어 만들어 놓음.
    public Ingredient addIngredient(String ingredientName){
        Ingredient ingredient = Ingredient
                .builder()
                .ingredientInfoName(ingredientName)
                .build();
        ingredient = ingredientRepository.save(ingredient);
        trie.addWord(ingredient.getIngredientInfoId(), ingredient.getIngredientInfoName());
        trie.bfs(); //fail 함수 전파
        return ingredient;
    }

}
