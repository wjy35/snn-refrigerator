package com.ssafy.reciperecommend.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id")
    private int recipeId;

    @Column(nullable = false, name="member_id")
    private Long memberId;

    @Column(name = "title", nullable = false, length = 32)
    private String title;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @Column(name = "youtube_url", length = 255)
    private String youtubeUrl;

    @Column(name = "favorite_count", nullable = false, columnDefinition = "int default 0")
    private int favoriteCount;

    @Column(name = "serving", nullable = false)
    private byte serving;

    @Column(name = "cooking_time", length = 10)
    private String cookingTime;

    @Column(name = "regist_datetime")
    private LocalDateTime registDatetime;

    @Column(name = "modify_datetime")
    private LocalDateTime modifyDatetime;

    @Column(name = "food_name", length = 10)
    private String foodName;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<RecipeIngredient> recipeIngredients;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<RecipeCustomIngredient> customIngredients;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<RecipeDetail> recipeDetails;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<FavoriteRecipe> favoriteRecipes;

    @PrePersist
    protected void onCreate() {
        registDatetime = LocalDateTime.now();
        modifyDatetime = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        modifyDatetime = LocalDateTime.now();
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    @Builder
    public Recipe(Long memberId, String title, String imageUrl, String youtubeUrl, byte serving, String cookingTime, String foodName) {
        this.memberId = memberId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.youtubeUrl = youtubeUrl;
        this.serving = serving;
        this.cookingTime = cookingTime;
        this.foodName = foodName;
    }
}

