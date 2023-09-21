package com.ssafy.membermanage.member.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.membermanage.aws.utils.S3helper;
import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.followPerson.service.FollowServiceImpl;
import com.ssafy.membermanage.hateIngredient.db.HateIngredient;
import com.ssafy.membermanage.hateIngredient.service.HateIngredientServiceImpl;
import com.ssafy.membermanage.house.db.House;
import com.ssafy.membermanage.house.service.HouseServiceImpl;
import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.member.request.AuthorizationRequest;
import com.ssafy.membermanage.member.request.SignupRequest;
import com.ssafy.membermanage.member.request.SingleMemberRequest;
import com.ssafy.membermanage.member.service.MemberServiceImpl;
import com.ssafy.membermanage.member.util.Helper;
import com.ssafy.membermanage.response.Response;
import com.ssafy.membermanage.response.ResponseViews;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
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
    private HouseServiceImpl houseService;

    @Autowired
    private HateIngredientServiceImpl hateIngredientService;

    @Autowired
    private FollowServiceImpl followService;

    @Autowired
    private Helper helper;

    @Autowired
    private S3helper s3helper;

    @Value("${rest-api-key}") String clientId;

    @Value("${redirect-uri}") String redirectUri;

    @Value("${client-secret}") String clientSecret;

    @Value("${member-default-profile-image}") String defaultProfileImage;


    @GetMapping("/{memberId}")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> getMemberInfo(@PathVariable Long memberId){
        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        Map<String, Object> memberInfo = new HashMap<>();
        memberInfo.put("memberId", memberId);
        memberInfo.put("nickname", member.getNickname());
        memberInfo.put("profileImageUrl", s3helper.getS3ImageUrl(member.getProfileImageFilename()));
        memberInfo.put("birthday", member.getBirthday());
        memberInfo.put("email", member.getEmail());
        memberInfo.put("houseCode", member.getHouse().getHouseCode());
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


        String ingredientName = hateIngredientService.ingredientName(ingredientId);
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
            String name = hateIngredientService.ingredientName(id);

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

    @PostMapping("/login")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<Response> kakaoLoginAndGetUserInfo(@RequestBody AuthorizationRequest request) throws JsonProcessingException {

        String authorizationCode = request.getAuthorizationCode();

        log.info("authorization code = {}", authorizationCode);
        String kakaoGetAuthTokenUrl = "https://kauth.kakao.com/oauth/token";
        RestTemplate restTemplate=new RestTemplate();

        //Set Header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.add("Accept", "application/json");

        //Set parameters
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", authorizationCode);
        params.add("client_secret", clientSecret);

        //Set http entity
        HttpEntity<MultiValueMap<String, String>> kakaoRequest = new HttpEntity<>(params, headers);
        ResponseEntity<String> stringResponseEntity = restTemplate.postForEntity(kakaoGetAuthTokenUrl, kakaoRequest, String.class);

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> KakaoAuthResponse = mapper.readValue(stringResponseEntity.getBody(), Map.class);

        //Get tokens from KaKao Server.
        String access_token = (String) KakaoAuthResponse.get("access_token");
        String refresh_token = (String) KakaoAuthResponse.get("refresh_token");

        //
        Map<String, Object> kakaoUserInfo = helper.getKakaoUserInfo(access_token);

        Long memberId = (Long) kakaoUserInfo.get("id");
        Map<String, Object> userInfo = (Map<String, Object>) kakaoUserInfo.get("kakao_account");

        Map<String, Object> data = new HashMap<>();
        data.put("id",  memberId);
        data.put("email", userInfo.getOrDefault("email", "No Email"));
        data.put("birthday", userInfo.getOrDefault("birthday", "9999"));
        data.put("accessToken", access_token);
        data.put("refreshToken", refresh_token);

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

        House house = houseService.findByHouseCode(houseCode).orElseThrow(
                () -> new CustomException(ErrorCode.No_Such_House)
        );
        Member member = Member
                .builder()
                .memberId(memberId)
                .nickname(nickname)
                .profileImageFilename(defaultProfileImage)
                .house(house)
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
}
