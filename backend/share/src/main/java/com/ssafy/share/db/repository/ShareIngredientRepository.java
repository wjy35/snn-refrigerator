package com.ssafy.share.db.repository;

import com.ssafy.share.db.entity.ShareIngredient;
import com.ssafy.share.db.entity.SharePost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShareIngredientRepository extends JpaRepository<ShareIngredient,Long> {
    ShareIngredient findByIngredientInfoIdAndSharePost(Short shareIngredientSeq,SharePost sharePost);
    void deleteBySharePost(SharePost sharePostId);
}
