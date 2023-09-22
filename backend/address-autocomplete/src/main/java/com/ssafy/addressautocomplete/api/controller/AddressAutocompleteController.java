package com.ssafy.addressautocomplete.api.controller;

import com.ssafy.addressautocomplete.api.exception.NoLocationInfoException;
import com.ssafy.addressautocomplete.api.mapper.LocationInfoMapper;
import com.ssafy.addressautocomplete.api.response.LocationInfoResponse;
import com.ssafy.addressautocomplete.api.response.Response;
import com.ssafy.addressautocomplete.db.entity.LocationInfoEntity;
import com.ssafy.addressautocomplete.service.LocationInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AddressAutocompleteController {
    private final LocationInfoService locationInfoService;

    @GetMapping("/{locationId}")
    public ResponseEntity<Response> search(@PathVariable Short locationId){
        LocationInfoEntity locationInfoEntity = locationInfoService.findById(locationId)
                .orElseThrow(NoLocationInfoException::new);
        LocationInfoResponse locationInfoResponse = LocationInfoMapper.INSTANCE.entityToResponse(locationInfoEntity);

        Response response = new Response();
        response.addRequest("locationId",locationId);
        response.setMessage("OK");
        response.addData("locationName",locationInfoResponse.getLocationName());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<Response> contains(@PathVariable String keyword){
        List<LocationInfoEntity> locationInfoEntities = locationInfoService.findByLocationNameContaining(keyword);
        List<LocationInfoResponse> locationInfoResponses = LocationInfoMapper.INSTANCE.entityToResponse(locationInfoEntities);
        Response response = new Response();
        response.addRequest("keyword",keyword);
        response.setMessage("OK");
        response.addData("locations",locationInfoResponses);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
