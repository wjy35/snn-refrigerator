package com.ssafy.ingredientautocomplete.service;

import com.ssafy.ingredientautocomplete.db.entity.IngredientInfoEntity;
import com.ssafy.ingredientautocomplete.db.repository.IngredientInfoRepository;
import com.ssafy.ingredientautocomplete.util.Trie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class IngredientAutocompleteServiceImpl implements IngredientAutocompleteService{
    private final IngredientInfoRepository ingredientInfoRepository;
    private final Trie trie;

    @PostConstruct
    public void init(){
        trie.init((List<IngredientInfoEntity>) ingredientInfoRepository.findAll());
    }

    @Override
    public List<IngredientInfoEntity> startWith(String keyword) {
        return trie.find(keyword,100);
    }
}
