package com.ssafy.share.util;

import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class TimeUtil {

    public String dateTypeConverter(LocalDateTime dateTime){ // 날짜를 n일 전 형태로 바
        LocalDateTime now = LocalDateTime.now();

        Duration duration = Duration.between(dateTime, now);
        long daysDifference = duration.toDays();
        long hoursDifference = duration.toHours();
        long minutesDifference = duration.toMinutes();
        long secondsDifference = duration.toSeconds();

        String relativeDateString;
        if (daysDifference > 0) {
            relativeDateString = daysDifference + "일 전";
        } else if (hoursDifference > 0) {
            relativeDateString = hoursDifference + "시간 전";
        } else if (minutesDifference > 0) {
            relativeDateString = minutesDifference + "분 전";
        } else {
            relativeDateString = secondsDifference + "초 전";
        }

        return relativeDateString;
    }

    public String dateTypeFormatter(LocalDateTime dateTime){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분");

        String formattedDateTime = dateTime.format(formatter);

        return formattedDateTime;
    }
}
