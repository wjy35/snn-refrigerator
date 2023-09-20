package com.ssafy.membermanage.house.service;

import com.ssafy.membermanage.house.db.House;

import java.util.Optional;

public interface HouseService {
    House createHouse();
    Optional<House> findByHouseId(Integer id);
    Optional<House> findByHouseCode(String houseCode);
    boolean existsByHouseCode(String houseCode);
    House save(House house);
}
