package com.ssafy.share.db.repository;

import com.ssafy.share.db.entity.LocationInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocationInfoRepository extends JpaRepository<LocationInfo,Short> {
    Optional<LocationInfo> findByLocationId(Short locationId);
}
