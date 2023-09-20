package com.ssafy.membermanage.memberLocation.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LocationInfo {

    private Short locationId;

    private String locationName;
}
