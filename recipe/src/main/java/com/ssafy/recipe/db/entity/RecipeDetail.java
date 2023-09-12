package com.ssafy.recipe.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_detail_id")
    private int recipeDetailId;

    @Column(name = "recipe_order", nullable = false)
    private int order;

    @Column(name = "content", nullable = false, length = 255)
    private String content;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;


}
