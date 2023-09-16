package com.ssafy.recipe.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
public class RecipeDetailParam {
    private String order;
    private String content;

    public RecipeDetailParam(String order, String content) {
        this.order = order;
        this.content = content;
    }
}
