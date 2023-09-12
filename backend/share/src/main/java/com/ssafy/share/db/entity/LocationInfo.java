package com.ssafy.share.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LocationInfo {
    @Id @GeneratedValue(strategy = IDENTITY)
    @Column(name = "location_id")
    private Short locationId;

    @Column(name="location_info",nullable = false,length = 20)
    private String locationName;

}
