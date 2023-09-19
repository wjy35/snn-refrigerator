package com.ssafy.share.db.repository;

import com.ssafy.share.db.entity.LocationInfo;
import com.ssafy.share.db.entity.SharePost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface ShareBoardRepository extends JpaRepository<SharePost,Long> {
    Optional<SharePost> findBySharePostId(Long sharePostId);
    Page<SharePost> findByLocationInfo(Pageable pageable,LocationInfo locationInfo);

    Page<SharePost> findByLocationInfoAndTitleContaining(Pageable pageable, LocationInfo locationInfo, String keyword);
}
