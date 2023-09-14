package com.ssafy.ingredient;

import com.ssafy.ingredient.db.entity.IngredientInfoEntity;
import com.ssafy.ingredient.db.repository.IngredientInfoRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
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

    @Test
    @Transactional
    void insertIngredientInfoEntityTest(){
        // given
        String ingredientInfoName = "뜨거운곽민규";
        IngredientInfoEntity insertedEntity = IngredientInfoEntity
                .builder()
                .ingredientInfoName(ingredientInfoName)
                .build();
        System.out.println("insertedEntity = " + insertedEntity);

        // when
        IngredientInfoEntity selectedEntity = ingredientInfoRepository.save(insertedEntity);

        // then
        System.out.println("selectedEntity = " + selectedEntity);
        Assertions.assertNotNull(selectedEntity.getIngredientInfoId());
        Assertions.assertEquals(selectedEntity.getIngredientInfoName(),insertedEntity.getIngredientInfoName());
    }

    @Test
    @Transactional
    void insertFailIngredientInfoEntityTest(){
        // given
        String ingredientInfoName = "테스트 식재료";
        IngredientInfoEntity insertedEntity = IngredientInfoEntity
                .builder()
                .ingredientInfoName(ingredientInfoName)
                .build();
        System.out.println("insertedEntity = " + insertedEntity);

        // when-then
        Assertions.assertThrows(Exception.class,()->{
            ingredientInfoRepository.save(insertedEntity);
        });
    }

}
