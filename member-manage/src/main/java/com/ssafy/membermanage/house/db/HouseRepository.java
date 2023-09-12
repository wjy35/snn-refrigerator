package com.ssafy.membermanage.house.db;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HouseRepository extends JpaRepository<House, Integer> {
    Optional<House> findByHouseId(Integer id);

    Optional<House> findByHouseCode(String houseCode);

    Boolean existsByHouseCode(String houseCode);

    House save(House house);
}
