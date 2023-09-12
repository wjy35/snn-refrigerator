package com.ssafy.share.db.repository;

import com.ssafy.share.db.entity.SharePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareBoardRepository extends JpaRepository<SharePost,Long> {

}
