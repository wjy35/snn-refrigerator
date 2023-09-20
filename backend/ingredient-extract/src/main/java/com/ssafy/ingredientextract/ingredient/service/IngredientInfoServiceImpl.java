package com.ssafy.ingredientextract.ingredient.service;

import com.ssafy.ingredientextract.ingredient.db.IngredientInfo;
import com.ssafy.ingredientextract.ingredient.db.IngredientInfoRepository;
import com.ssafy.ingredientextract.trie.Trie;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IngredientInfoServiceImpl {
    private final IngredientInfoRepository ingredientInfoRepository;

    private final Trie trie;
    @PostConstruct
    public void initSetting(){
        List<IngredientInfo> ingredientInfos = ingredientInfoRepository.findAll();

        //ingredient 트라이에 넣어두기
        for(IngredientInfo ingredientInfo : ingredientInfos){
            trie.addWord(ingredientInfo.getIngredientInfoId(), ingredientInfo.getIngredientInfoName());
        }

        trie.bfs(); //fail 함수 전파
    }

    //ingredient 추가 api가 있어 만들어 놓음.
    public IngredientInfo addIngredient(String ingredientName){
        IngredientInfo ingredientInfo = IngredientInfo
                .builder()
                .ingredientInfoName(ingredientName)
                .build();
        ingredientInfo = ingredientInfoRepository.save(ingredientInfo);
        trie.addWord(ingredientInfo.getIngredientInfoId(), ingredientInfo.getIngredientInfoName());
        trie.bfs(); //fail 함수 전파
        return ingredientInfo;
    }

}
