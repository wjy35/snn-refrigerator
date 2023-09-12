package com.ssafy.recipe.db.entity;

import javax.persistence.*;

@Entity
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


}
