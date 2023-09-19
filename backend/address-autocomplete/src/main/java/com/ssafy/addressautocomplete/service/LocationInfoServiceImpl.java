package com.ssafy.addressautocomplete.service;

import com.ssafy.addressautocomplete.db.entity.LocationInfoEntity;
import com.ssafy.addressautocomplete.db.repository.LocationInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LocationInfoServiceImpl implements LocationInfoService{

    private final LocationInfoRepository locationInfoRepository;

    @Override
    public Optional<LocationInfoEntity> findById(Short locationId) {
        return locationInfoRepository.findById(locationId);
    }

    @Override
    public List<LocationInfoEntity> findByLocationNameContaining(String locationName) {
        return locationInfoRepository.findByLocationNameContaining(locationName);
    }
}
