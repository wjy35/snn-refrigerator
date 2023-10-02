package com.ssafy.recipe.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class RecipeSearchMemberRequest {
    private long searchId;
    private long myId;
    private int page;
    private int size;
}
