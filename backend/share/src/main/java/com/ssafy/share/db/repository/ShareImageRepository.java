package com.ssafy.share.db.repository;

import com.ssafy.share.db.entity.ShareImage;
import com.ssafy.share.db.entity.SharePost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShareImageRepository extends JpaRepository<ShareImage, String> {
    void deleteBySharePost(SharePost sharePostId);
}
