package com.ssafy.membermanage.house.api;

import com.ssafy.membermanage.house.db.House;
import com.ssafy.membermanage.house.dto.CreateHouseDto;
import com.ssafy.membermanage.house.service.HouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/house")
public class HouseController {

    @Autowired
    private HouseService houseService;

    @PostMapping("")
    public ResponseEntity<CreateHouseDto> createHouse(){
        House house = houseService.createHouse();
        return ResponseEntity.ok(new CreateHouseDto(house.getHouseCode()));
    }
}