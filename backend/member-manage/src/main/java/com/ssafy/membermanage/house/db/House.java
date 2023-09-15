package com.ssafy.membermanage.house.db;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class House {
    @Id
    @Column(name = "house_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer houseId;

    @Column(name = "house_code", columnDefinition = "char(36)", nullable = false)
    private String houseCode;
}
