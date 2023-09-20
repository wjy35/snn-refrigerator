package com.ssafy.membermanage.member.db;

import com.ssafy.membermanage.house.db.House;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member {
    @Id
    @Column(name = "member_id", unique = true, nullable = false)
    private Long memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "house_seq")
    private House house;

    @Column(name = "nickname", length = 10, unique = true, nullable = false)
    private String nickname;

    @Column(name = "profile_image_filename")
    private String profileImageFilename;

    @Column(name = "birthday", length = 4, nullable = false)
    private String birthday;

    @Column(name = "email", columnDefinition = "text", nullable = false)
    private String email;

    @Column(name = "follow_count")
    @ColumnDefault("0")
    private Integer followCount;

    @Builder
    public Member(Long memberId, House house, String nickname, String profileImageFilename, String birthday, String email){
        this.memberId = memberId;
        this.house = house;
        this.nickname = nickname;
        this.profileImageFilename = profileImageFilename;
        this.birthday = birthday;
        this.email = email;
        this.followCount = 0;
    }
}
