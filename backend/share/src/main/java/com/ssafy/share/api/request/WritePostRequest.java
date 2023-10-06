package com.ssafy.share.api.request;

import lombok.Data;

import java.util.List;

@Data
public class WritePostRequest {
    private List<ShareIngredientRequest> shareIngredients;
    private ShareBoardWriteRequest shareBoardWriteRequest;
}
