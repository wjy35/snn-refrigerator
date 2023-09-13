package com.ssafy.membermanage.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    No_Such_Member(HttpStatus.NOT_FOUND, "There is no such member."),
    No_Such_House(HttpStatus.NOT_FOUND, "There is no such house."),
    No_Such_Ingredient(HttpStatus.NOT_FOUND, "There is no such ingredient."),
    Duplicate_Nickname(HttpStatus.CONFLICT, "Duplicate nickname");


    private final HttpStatus httpStatus;
    private final String message;
}
