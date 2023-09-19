package com.ssafy.addressautocomplete.db.repository;

import com.ssafy.addressautocomplete.db.entity.LocationInfoEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LocationInfoRepository extends CrudRepository<LocationInfoEntity,Short> {
    List<LocationInfoEntity> findByLocationNameContaining(String locationName);
}
