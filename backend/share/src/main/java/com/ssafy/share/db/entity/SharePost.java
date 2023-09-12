package com.ssafy.share.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SharePost extends BaseTimeEntity{
    @Id @GeneratedValue(strategy = IDENTITY)
    @Column(name = "share_post_id")
    private Long sharePostId; // 글번호

//    @Column(name = "memberId",nullable = false)
//    private Long memberId;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member;

    @OneToOne
    @JoinColumn(name = "location_id")
    private LocationInfo locationInfo;

    @Column(name="title",nullable = false,length = 32)
    private String title;

    @Column(name="content",nullable = false,columnDefinition = "text")
    private String content;

    @OneToMany(mappedBy = "sharePost", cascade = CascadeType.REMOVE)
    private List<ShareImage> shareImages=new ArrayList<>(); // 나눔 이미지들

    @OneToMany(mappedBy = "sharePost", cascade = CascadeType.REMOVE)
    private List<ShareIngredient> shareIngredients=new ArrayList<>(); // 나눔 식재료들

    @Column(name="thumbnail",length = 255)
    private String thumbnail;

    public SharePost(Member member, LocationInfo locationInfo,
                     String title, String content, List<ShareImage> shareImages,
                     List<ShareIngredient> shareIngredients, String thumbnail) {
        this.member = member;
        this.locationInfo = locationInfo;
        this.title = title;
        this.content = content;
        this.shareImages = shareImages;
        this.shareIngredients = shareIngredients;
        this.thumbnail = thumbnail;
    }
}
