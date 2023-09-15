package com.ssafy.membermanage.house.service;

import com.ssafy.membermanage.house.db.House;
import com.ssafy.membermanage.house.db.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class HouseService {
    @Autowired
    private HouseRepository houseRepository;

    public House createHouse(){
        String houseCode = UUID.randomUUID().toString();
        House house = new House();
        house.setHouseCode(houseCode);
        return houseRepository.save(house);
    }

}
