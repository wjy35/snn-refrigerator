package com.ssafy.membermanage.house.service;

import com.ssafy.membermanage.house.db.House;
import com.ssafy.membermanage.house.db.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class HouseServiceImpl {
    @Autowired
    private HouseRepository houseRepository;

    public House createHouse(){
        String houseCode = UUID.randomUUID().toString();
        House house = new House();
        house.setHouseCode(houseCode);
        return houseRepository.save(house);
    }
    public Optional<House> findByHouseId(Integer id){
        return houseRepository.findByHouseId(id);
    }

    public Optional<House> findByHouseCode(String houseCode){
        return houseRepository.findByHouseCode(houseCode);
    }

    public boolean existsByHouseCode(String houseCode){
        return houseRepository.existsByHouseCode(houseCode);
    }

    public House save(House house){
        return houseRepository.save(house);
    }
}
