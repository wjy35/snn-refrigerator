package com.ssafy.membermanage.member.request;

import lombok.Data;
import java.util.*;

@Data
public class SignupRequest {
    private Long memberId;
    private String nickname;
    private List<Short> hateIngredientList;
    private List<Short> placeInfoList;
    private String profileImageFilename;
    private String houseCode;
    private String birthday;
    private String email;
}
