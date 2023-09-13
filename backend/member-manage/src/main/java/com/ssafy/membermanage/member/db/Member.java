package com.ssafy.membermanage.member.db;

import com.ssafy.membermanage.house.db.House;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member {
    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // TODO : 카카오톡에서 만들어주는 unique id로 바꾸기. 지금은 임시로 identity 사용 중
    private Long memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "house_seq")
    private House house;

    @Column(name = "nickname", length = 10, unique = true, nullable = false)
    private String nickname;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Column(name = "birthday", length = 4, nullable = false)
    private String birthday;

    @Column(name = "email", columnDefinition = "text", nullable = false)
    private String email;

    @Column(name = "follow_count")
    @ColumnDefault("0")
    private Integer followCount;


}
