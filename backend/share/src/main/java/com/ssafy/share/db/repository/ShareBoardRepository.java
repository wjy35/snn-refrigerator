package com.ssafy.share.db.repository;

import com.ssafy.share.db.entity.SharePost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ShareBoardRepository extends JpaRepository<SharePost,Long> {
    Optional<SharePost> findBySharePostId(Long sharePostId);
    Page<SharePost> findByLocationId(Pageable pageable,Short locationId);

    Page<SharePost> findByLocationIdAndTitleContaining(Pageable pageable, Short locationId, String keyword);
}
