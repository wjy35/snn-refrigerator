package com.ssafy.membermanage.member.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.membermanage.aws.utils.S3helper;
import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.followPerson.service.FollowServiceImpl;
import com.ssafy.membermanage.hateIngredient.db.HateIngredient;
import com.ssafy.membermanage.hateIngredient.dto.HateIngredientInfo;
import com.ssafy.membermanage.hateIngredient.service.HateIngredientServiceImpl;
import com.ssafy.membermanage.house.dto.ModifyMemberHouseDto;
import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.member.request.AuthorizationRequest;
import com.ssafy.membermanage.member.request.SignupRequest;
import com.ssafy.membermanage.member.request.SingleMemberRequest;
import com.ssafy.membermanage.member.service.MemberServiceImpl;
import com.ssafy.membermanage.member.util.Helper;
import com.ssafy.membermanage.memberLocation.dto.LocationInfo;
import com.ssafy.membermanage.memberLocation.service.MemberLocationServiceImpl;
import com.ssafy.membermanage.response.Response;
import com.ssafy.membermanage.response.ResponseViews;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Slf4j
@RestController
@RequestMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
public class MemberController {
    @Autowired
    private MemberServiceImpl memberService;

    @Autowired
    private HateIngredientServiceImpl hateIngredientService;

    @Autowired
    private FollowServiceImpl followService;

    @Autowired
    private MemberLocationServiceImpl memberLocationService;

    @Autowired
    private Helper helper;

    @Autowired
    private S3helper s3helper;

    @Value("${rest-api-key}") String clientId;

    @Value("${redirect-uri}") String redirectUri;

    @Value("${client-secret}") String clientSecret;

    @Value("${member-default-profile-image}") String defaultProfileImage;


    @GetMapping("/{memberId}/me")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> getMyInfo(@PathVariable Long memberId){
        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        List<LocationInfo> locationInfos = memberLocationService.getLocations(member);
        List<HateIngredientInfo> hateIngredientInfos = hateIngredientService.getHateIngredientInfo(member);

        Map<String, Object> memberInfo = new HashMap<>();
        memberInfo.put("memberId", memberId);
        memberInfo.put("nickname", member.getNickname());
        memberInfo.put("profileImageUrl", s3helper.getS3ImageUrl(member.getProfileImageFilename()));
        memberInfo.put("birthday", member.getBirthday());
        memberInfo.put("email", member.getEmail());
        memberInfo.put("houseCode", member.getHouseCode());
        memberInfo.put("followCount", member.getFollowCount());
        memberInfo.put("placeList", locationInfos);
        memberInfo.put("hateIngredientList", hateIngredientInfos);


        Map<String, Object> data = new HashMap<>();
        data.put("memberInfo", memberInfo);

        Response response = Response
                .builder()
                .message("ok")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    } //OK

    @GetMapping("/{memberId}")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> getMemberInfo(@PathVariable Long memberId){
        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        Map<String, Object> memberInfo = new HashMap<>();
        memberInfo.put("memberId", memberId);
        memberInfo.put("nickname", member.getNickname());
        memberInfo.put("profileImageUrl", s3helper.getS3ImageUrl(member.getProfileImageFilename()));
        memberInfo.put("followCount", member.getFollowCount());


        Map<String, Object> data = new HashMap<>();
        data.put("memberInfo", memberInfo);

        Response response = Response
                .builder()
                .message("ok")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    } //OK

    @PostMapping("/check-duplicate")
    @JsonView(ResponseViews.Request.class)
    public ResponseEntity<Response> checkDuplicate(@RequestBody Map<String, Object> request){

        String nickname = (String) request.get("nickname");
        boolean flag;
        flag = !memberService.existsByNickname(nickname);
        Map<String, Object> data = new HashMap<>();
        data.put("isUnique", flag);

        Response response = Response
                .builder()
                .request(request)
                .message("ok")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }//OM

    @PutMapping("/{memberId}")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> modifyMemberInfo(@RequestBody Map<String, Object> request, @PathVariable Long memberId){
        String nickname = (String) request.get("nickname");
        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        if(memberService.existsByNickname(nickname)) throw new CustomException(ErrorCode.Duplicate_Nickname);

        log.info(nickname);

        member.setNickname(nickname);
        member = memberService.save(member);

        Map<String, Object> data = new HashMap<>();
        data.put("nickname", member.getNickname());

        Response response = Response.
                builder().
                message("OK").
                data(data).
                build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{memberId}/hate-ingredient/{ingredientId}")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> addInedibleIngredient(@PathVariable Long memberId, @PathVariable Short ingredientId){
        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));


        String ingredientName = hateIngredientService.getIngredientName(ingredientId);
        HateIngredient hateIngredient = HateIngredient
                .builder()
                .member(member)
                .ingredientId(ingredientId)
                .build();
        hateIngredient = hateIngredientService.save(hateIngredient);

        HashMap<String, Object> data = new HashMap<>();
        data.put("hateIngredientId", hateIngredient.getIngredientId());
        data.put("hateIngredientName", ingredientName);

        Response response = Response.
                builder().
                message("OK").
                data(data).
                build();
        return ResponseEntity.ok(response);
    }//OK

    @GetMapping("/{memberId}/hate-ingredient")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> getInedibleIngredientList(@PathVariable Long memberId){
        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        List<HateIngredient> ingredientList = hateIngredientService.findByMember(member);
        List<Map<String, Object>> ingredients = new ArrayList<>();
        for(HateIngredient ingredient : ingredientList){
            Short id = ingredient.getIngredientId();
            String name = hateIngredientService.getIngredientName(id);

            Map<String, Object> mp = new HashMap<>();
            mp.put("ingredientId", id);
            mp.put("ingredientName", name);

            ingredients.add(mp);
        }

        HashMap<String, Object> data = new HashMap<>();
        data.put("ingredient", ingredients);

        Response response = Response.
                builder().
                message("OK").
                data(data).
                build();
        return ResponseEntity.ok(response);
    }//OK

    @DeleteMapping("/{memberId}/hate-ingredient/{ingredientId}")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> deleteInedibleIngredient(@PathVariable Long memberId, @PathVariable Short ingredientId){
        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        List<HateIngredient> ingredientList = hateIngredientService.findByMemberAndIngredientId(member, ingredientId);
        for(HateIngredient ingredient : ingredientList){
            Integer id = ingredient.getHateIngredientTblId();
            hateIngredientService.deleteByHateIngredientTblId(id);
        }
        HashMap<String, Object> data = new HashMap<>();
        data.put("memberId", memberId);
        data.put("ingredientId", ingredientId);

        Response response = Response.
                builder().
                message("OK").
                data(data).
                build();
        return ResponseEntity.ok(response);
    }//OK

    @PostMapping("{followerId}/follow/{followeeId}")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> ResponseFollowOrUnfollow(@PathVariable Long followerId, @PathVariable Long followeeId){
        Member follower = memberService.findByMemberId(followerId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        Member followee = memberService.findByMemberId(followeeId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        boolean flag = followService.followOrUnfollow(follower, followee);
        //data 내용 작성
        Map<String, Object> data = new HashMap<>();
        data.put("flag", flag);

        //response
        Response response = Response
                .builder()
                .message("ok")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("{memberId}/follow")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> getFolloweeList(@PathVariable Long memberId){
        Member follower = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        List<Map<String, Object>> followees = followService.getFolloweeList(follower);
        //data 내용 작성
        Map<String, Object> data = new HashMap<>();
        data.put("followees", followees);

        //response
        Response response = Response
                .builder()
                .message("ok")
                .data(data)
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/get-kakao-info")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> kakaoLoginAndGetUserInfo(@RequestBody AuthorizationRequest request) throws JsonProcessingException {
        String accessToken = request.getAccessToken();
        //
        Map<String, Object> kakaoUserInfo = helper.getKakaoUserInfo(accessToken);

        Long memberId = (Long) kakaoUserInfo.get("id");
        Map<String, Object> userInfo = (Map<String, Object>) kakaoUserInfo.get("kakao_account");

        Map<String, Object> kakaoMemberInfo = new HashMap<>();
        kakaoMemberInfo.put("id",  memberId);
        kakaoMemberInfo.put("email", userInfo.getOrDefault("email", "No Email"));
        kakaoMemberInfo.put("birthday", userInfo.getOrDefault("birthday", "9999"));

        Map<String, Object> data = new HashMap<>();
        data.put("kakaoMemberInfo", kakaoMemberInfo);

        Response response = Response.
                builder().
                message("OK").
                data(data).
                build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> signup(@RequestBody SignupRequest request){
        Long memberId = request.getMemberId();
        String nickname = request.getNickname();
        String houseCode = request.getHouseCode();
        String birthday = request.getBirthday();
        String email = request.getEmail();
        Member member = Member
                .builder()
                .memberId(memberId)
                .nickname(nickname)
                .profileImageFilename(defaultProfileImage)
                .houseCode(houseCode)
                .birthday(birthday)
                .email(email)
                .build();
        member = memberService.save(member);

        Response response = Response
                .builder()
                .message("OK")
                .build();
        return ResponseEntity.ok(response);
    }//OK

    @DeleteMapping("/{memberId}/withdrawal")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> withDrawal(@PathVariable Long memberId, HttpServletRequest request) throws JsonProcessingException {
        log.info("NO");
        Long kakaoId = memberService.validateToken(request);
        if(Long.compare(kakaoId, memberId) != 0) throw new CustomException(ErrorCode.No_Valid_Token);

        memberService.deleteByMemberId(memberId);
        if(!memberService.kakaoLogout(request, memberId)) throw new CustomException(ErrorCode.Logout_Failure);


        Map<String, Object> data = new HashMap<>();
        data.put("status", true);

        Response response = Response
                .builder()
                .message("OK")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }//OK

    @PostMapping("/logout")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> kakaoLogout(HttpServletRequest request, @RequestBody SingleMemberRequest requestBody) throws JsonProcessingException {

        Long memberId = requestBody.getMemberId();
        Long kakaoId = memberService.validateToken(request);
        log.info("KakaoId: " + kakaoId);
        log.info("memberId: " + memberId);
        if(Long.compare(kakaoId, memberId) != 0) throw new CustomException(ErrorCode.No_Valid_Token);
        if(!memberService.kakaoLogout(request, memberId)) throw new CustomException(ErrorCode.Logout_Failure);

        Map<String, Object> data = new HashMap<>();
        data.put("status", true);
        Response response = Response
                .builder()
                .message("OK")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }//OK

    @PutMapping("/{memberId}/profile-image")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> modifyProfileImageProfile(@PathVariable Long memberId, @RequestParam MultipartFile profileImage) throws Exception {
        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        String profileImageFilename = member.getProfileImageFilename();

        String newFilename;

        if(profileImageFilename.equals(defaultProfileImage)){
            newFilename = s3helper.upload(
                    "member/profile",
                    member.getNickname(),
                    profileImage
            );
        }
        else{
            newFilename = s3helper.modify(
                    "member/profile",
                    member.getNickname(),
                    profileImageFilename,
                    profileImage
            );
        }
        member.setProfileImageFilename(newFilename);
        member = memberService.save(member);

        Map<String, Object> data = new HashMap<>();
        data.put("profileImageUrl", s3helper.getS3ImageUrl(newFilename));

        Response response = Response
                .builder()
                .message("ok")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }//OK

    @PostMapping("/house")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> createHouse(){
        String houseCode = memberService.createHouseCode();

        Map<String, Object> data = new HashMap<>();
        data.put("houseCode", houseCode);

        Response response = Response.
                builder().
                message("OK").
                data(data).
                build();
        return ResponseEntity.ok(response);
    }//OK

    @GetMapping("/house/{houseCode}")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> checkHouse(@PathVariable String houseCode){
        boolean flag = memberService.existsByHouseCode(houseCode);
        Map<String, Object> data = new HashMap<>();
        data.put("existance", flag);

        Response response = Response.
                builder().
                message("OK").
                data(data).
                build();
        return ResponseEntity.ok(response);
    }//OK

    @PutMapping("/house")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> modifyMemberHouse(@RequestBody ModifyMemberHouseDto request){
        Long memberId = request.getMemberId();
        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        String houseCode = request.getHouseCode();
        member = memberService.modifyMemberHouse(member, houseCode);
        memberService.save(member);

        Map<String, Object> houseInfo = new HashMap<>();
        houseInfo.put("memberId", memberId);
        houseInfo.put("houseCode", houseCode);

        Map<String, Object> data = new HashMap<>();
        data.put("houseInfo", houseInfo);

        Response response = Response.
                builder().
                message("OK").
                data(data).
                build();
        return ResponseEntity.ok(response);
    }//OK
}
