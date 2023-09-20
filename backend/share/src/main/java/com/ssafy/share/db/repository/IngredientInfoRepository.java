package com.ssafy.share.db.repository;

import com.ssafy.share.db.entity.IngredientInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IngredientInfoRepository extends JpaRepository<IngredientInfo, Short> {

}
