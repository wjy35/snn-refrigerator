package com.ssafy.share.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.GenerationType.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LocationInfo {
    @Id @GeneratedValue(strategy = IDENTITY)
    @Column(name = "location_id")
    private Short locationId;

    @OneToMany(mappedBy = "locationInfo", cascade = CascadeType.ALL)
    private List<SharePost> sharePosts=new ArrayList<>(); // 나눔 이미지들

    @Column(name="location_info",nullable = false,length = 20)
    private String locationName;

}
