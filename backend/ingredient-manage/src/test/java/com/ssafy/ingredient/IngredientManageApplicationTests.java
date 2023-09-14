package com.ssafy.ingredient;

import com.ssafy.ingredient.db.entity.IngredientInfoEntity;
import com.ssafy.ingredient.db.repository.IngredientInfoRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.NoSuchElementException;

@SpringBootTest
class IngredientManageApplicationTests {

    @Autowired
    IngredientInfoRepository ingredientInfoRepository;

    @Test
    void contextLoads() {
        Assertions.assertNotNull(ingredientInfoRepository);
    }

    @Test
    void selectIngredientInfoTest(){
        // given
        Short ingredientInfoId = 1;

        // when
        IngredientInfoEntity selectedIngredientInfoEntity = ingredientInfoRepository.findByIngredientInfoId(ingredientInfoId).get();

        // then
        System.out.println("selectedIngredientInfo = " + selectedIngredientInfoEntity);
        Assertions.assertEquals("테스트 식재료", selectedIngredientInfoEntity.getIngredientInfoName());
    }

    @Test
    void selectFailIngredientInfoTest(){
        // given
        Short ingredientInfoId = 0;

        // when-then
        Assertions.assertThrows(NoSuchElementException.class,()->{
            IngredientInfoEntity selectedIngredientInfoEntity = ingredientInfoRepository.findByIngredientInfoId(ingredientInfoId).get();
        });
    }
}
