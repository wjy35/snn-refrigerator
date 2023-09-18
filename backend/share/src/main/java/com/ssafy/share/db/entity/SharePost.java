package com.ssafy.share.db.entity;

import com.ssafy.share.api.request.ShareBoardUpdateRequest;
import lombok.AccessLevel;
import lombok.Builder;
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

    @Column(name = "member_Id",nullable = false)
    private Long memberId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="location_id")
    private LocationInfo locationInfo; // 글 번호
//    @ManyToOne
//    @JoinColumn(name="member_id")
//    private Member member;

    @OneToMany(mappedBy = "sharePost", cascade = CascadeType.REMOVE)
    private List<ShareImage> shareImages=new ArrayList<>(); // 나눔 이미지들

    @OneToMany(mappedBy = "sharePost", cascade = CascadeType.REMOVE)
    private List<ShareIngredient> shareIngredients=new ArrayList<>(); // 나눔 식재료들

    @Column(name="title",nullable = false,length = 32)
    private String title;

    @Column(name="content",nullable = false,columnDefinition = "text")
    private String content;

    @Column(name="thumbnail",length = 255)
    private String thumbnail;

    // 생성자
    @Builder
    public SharePost(Long memberId,LocationInfo locationInfo,List<ShareImage> shareImages,
                     List<ShareIngredient> shareIngredients, String title, String content, String thumbnail) {
        this.memberId = memberId;
        this.shareImages = shareImages;
        this.shareIngredients = shareIngredients;
        this.title = title;
        this.content = content;
        this.thumbnail = thumbnail;
    }

    public void update(ShareBoardUpdateRequest request){
        this.title=request.getTitle();
        this.locationInfo=request.getLocationInfo();
        this.content=request.getContent();
        this.shareImages=request.getShareImages();
    }
}
