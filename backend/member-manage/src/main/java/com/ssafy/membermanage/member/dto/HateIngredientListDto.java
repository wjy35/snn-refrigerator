package com.ssafy.membermanage.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class HateIngredientListDto {
    private final List<String> hateIngredient;

}
