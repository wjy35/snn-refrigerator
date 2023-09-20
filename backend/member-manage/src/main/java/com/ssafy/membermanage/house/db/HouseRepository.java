package com.ssafy.membermanage.house.db;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.Optional;

public interface HouseRepository extends JpaRepository<House, Integer> {
    Optional<House> findByHouseId(Integer id);

    Optional<House> findByHouseCode(String houseCode);

    boolean existsByHouseCode(String houseCode);

    House save(House house);
}
