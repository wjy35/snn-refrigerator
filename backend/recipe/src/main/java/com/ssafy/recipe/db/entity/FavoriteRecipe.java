package com.ssafy.recipe.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FavoriteRecipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_recipe_seq")
    private int favoriteRecipeSeq;

    @Column(name = "member_id", nullable = false)
    private Long memberId;


    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @Builder
    public FavoriteRecipe(Recipe recipe, long memberId){
        this.recipe = recipe;
        this.memberId = memberId;
    }
}
