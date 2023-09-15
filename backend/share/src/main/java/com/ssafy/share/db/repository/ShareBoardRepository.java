package com.ssafy.share.db.repository;

import com.ssafy.share.db.entity.SharePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface ShareBoardRepository extends JpaRepository<SharePost,Long> {
    Optional<SharePost> findBySharePostId(Long sharePostId);
}
