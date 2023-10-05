package com.ssafy.share.db.repository;

import com.ssafy.share.db.entity.ShareImage;
import com.ssafy.share.db.entity.SharePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface ShareImageRepository extends JpaRepository<ShareImage, String> {
    @Transactional
    void deleteBySharePost(SharePost sharePostId);
}
