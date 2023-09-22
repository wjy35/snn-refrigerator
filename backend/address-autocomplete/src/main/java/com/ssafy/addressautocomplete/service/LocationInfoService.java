package com.ssafy.addressautocomplete.service;

import com.ssafy.addressautocomplete.db.entity.LocationInfoEntity;

import java.util.List;
import java.util.Optional;

public interface LocationInfoService {
    Optional<LocationInfoEntity> findById(Short locationId);
    List<LocationInfoEntity> findByLocationNameContaining(String locationName);
}
