package com.ssafy.houseingredient.db.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "house_ingredient")
public class HouseIngredientEntity {
    @Id
    @Column(name="house_ingredient_id")
    @GeneratedValue
    private Integer houseIngredientId;

    @Column(name="house_seq")
    private Integer houseSeq;

    @Column(name="ingredient_info_id")
    private Short ingredientInfoId;

    @Column(name="ingredient_name", length = 15)
    private String ingredientName;

    @Column(name="storage_type")
    private Byte storageType;

    @Column(name="last_date")
    private Date lastDate;

    @Column(name="storage_date")
    private LocalDateTime storageDate;

    @PrePersist
    protected void onCreate() {
        storageDate = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "HouseIngredientEntity{" +
                "houseIngredientId=" + houseIngredientId +
                ", houseSeq=" + houseSeq +
                ", ingredientInfoId=" + ingredientInfoId +
                ", ingredientName='" + ingredientName + '\'' +
                ", storageType=" + storageType +
                ", lastDate=" + lastDate +
                ", storageDate=" + storageDate +
                '}';
    }

}
