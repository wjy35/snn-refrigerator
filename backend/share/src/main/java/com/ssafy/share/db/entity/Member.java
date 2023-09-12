package com.ssafy.share.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.GenerationType.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "member_id")
    private Long memberId; // 글번호

    // todo: house와 join


    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<SharePost> posts=new ArrayList<>(); // 나눔 이미지들

    @Column(name = "nickname",length = 10)
    private String nickname;

}
