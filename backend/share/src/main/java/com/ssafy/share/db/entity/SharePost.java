package com.ssafy.share.db.entity;

import com.ssafy.share.api.request.ShareBoardUpdateRequest;
import com.ssafy.share.api.request.ShareIngredientRequest;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.*;

@Slf4j
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SharePost extends BaseTimeEntity{
    @Id @GeneratedValue(strategy = IDENTITY)
    @Column(name = "share_post_id")
    private Long sharePostId; // 글번호

    @Column(name = "member_Id",nullable = false)
    private Long memberId;

    @Column(name = "location_Id",nullable = false)
    private Short locationId; // 지역코드

    @OneToMany(mappedBy = "sharePost", cascade = CascadeType.ALL)
    private List<ShareImage> shareImages=new ArrayList<>(); // 나눔 이미지들

    @OneToMany(mappedBy = "sharePost", cascade = CascadeType.ALL)
    private List<ShareIngredient> shareIngredients=new ArrayList<>(); // 나눔 식재료들

    @Column(name="title",nullable = false,length = 32)
    private String title;

    @Column(name="content",nullable = false,columnDefinition = "text")
    private String content;

    @Column(name="thumbnail",length = 255)
    private String thumbnail;

    // 생성자
    @Builder
    public SharePost(Long memberId,Short locationId,List<ShareImage> shareImages,
                     List<ShareIngredient> shareIngredients, String title, String content, String thumbnail) {
        this.memberId = memberId;
        this.locationId=locationId;
        this.shareImages = shareImages;
        this.shareIngredients = shareIngredients;
        this.title = title;
        this.content = content;
        this.thumbnail = thumbnail;
    }
    public void setShareIngredients(List<ShareIngredientRequest> shareIngredientRequests){
        for (ShareIngredientRequest s:shareIngredientRequests){
            this.shareIngredients.add(new ShareIngredient(this,s.getIngredientInfoId(),s.getAmount()));
        }
    }
    public void setShareImages(List<String> shareImages){
        log.info("이미지 : {}",shareImages);
        for (String i:shareImages){
            this.shareImages.add(new ShareImage(this,i));
        }
        this.thumbnail= shareImages.get(0);
    }
    public void update(ShareBoardUpdateRequest request){
        this.title=request.getTitle();
        this.locationId=request.getLocationId();
        this.content=request.getContent();
//        this.shareImages=request.getShareImages();
//        this.shareIngredients=request.getShareIngredients();
    }
}
