package com.ssafy.membermanage.member.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class HateIngredientDto {
    private final Short newHateIngredientId;

    private final String newHateIngredientName;
}
