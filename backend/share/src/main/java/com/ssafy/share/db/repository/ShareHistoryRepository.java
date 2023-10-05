package com.ssafy.share.db.repository;

import com.ssafy.share.db.entity.ShareHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShareHistoryRepository extends JpaRepository<ShareHistory,Long> {
    List<ShareHistory> findByGiverId(Long giverId);
    List<ShareHistory> findByTakerId(Long takerId);
}
