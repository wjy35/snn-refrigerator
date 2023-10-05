package com.ssafy.share.db.entity;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ShareHistory {
    @Id @GeneratedValue(strategy = IDENTITY)
    @Column(name = "share_history_id")
    private Long shareHistoryId;

    // 둘다 nickname을 저장
    @Column(name = "giver_id")
    private Long giverId;
    @Column(name = "taker_id")
    private Long takerId;
    @Column(name = "completed_time")
    private String completedTime; // 나눔 완료 시각
    @Column(name = "is_completed")
    private Boolean isCompleted;

    @Builder
    public ShareHistory(Long giverId, Long takerId, boolean isCompleted) {
        this.giverId = giverId;
        this.takerId = takerId;
        this.isCompleted = false;
    }

    public void complete(){
        this.isCompleted=true;
        this.completedTime=LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분 ss초"));
        System.out.println(isCompleted +" "+completedTime);
    }
}
