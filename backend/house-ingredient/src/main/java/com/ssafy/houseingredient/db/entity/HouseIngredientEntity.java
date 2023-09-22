package com.ssafy.houseingredient.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "house_ingredient")
public class HouseIngredientEntity {
    @Id
    @Column(name="house_ingredient_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer houseIngredientId;

    @Column(name="house_code")
    private String houseCode;

    @Column(name="ingredient_info_id")
    private Short ingredientInfoId;

    @Column(name="ingredient_name", length = 15)
    private String ingredientName;

    @Column(name="storage_type")
    private Byte storageType;

    @Column(name="last_date")
    private LocalDate lastDate;

    @Column(name="storage_date")
    private LocalDateTime storageDate;

    @PrePersist
    protected void onCreate() {
        storageDate = LocalDateTime.now();
    }


}
