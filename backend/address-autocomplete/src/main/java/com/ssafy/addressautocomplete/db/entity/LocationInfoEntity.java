package com.ssafy.addressautocomplete.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "location_info")
public class LocationInfoEntity {
    @Id
    @Column(name="location_id")
    @GeneratedValue
    private Short locationId;

    @Column(name="location_name", length = 20)
    private String locationName;
}
