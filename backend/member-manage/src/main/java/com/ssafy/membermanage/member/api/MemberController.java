package com.ssafy.membermanage.member.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.membermanage.S3.utils.S3helper;
import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.followPerson.service.FollowService;
import com.ssafy.membermanage.hateIngredient.db.HateIngredient;
import com.ssafy.membermanage.hateIngredient.db.HateIngredientRepository;
import com.ssafy.membermanage.hateIngredient.service.HateIngredientService;
import com.ssafy.membermanage.house.db.House;
import com.ssafy.membermanage.house.db.HouseRepository;
import com.ssafy.membermanage.member.MemberViews;
import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.member.dto.*;
import com.ssafy.membermanage.member.request.AuthorizationRequest;
import com.ssafy.membermanage.member.request.SignupRequest;
import com.ssafy.membermanage.member.request.SingleMemberRequest;
import com.ssafy.membermanage.member.service.MemberService;
import com.ssafy.membermanage.member.util.Helper;
import com.ssafy.membermanage.response.ResponseDto;
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
    private MemberService memberService;

    @Autowired
    private HateIngredientRepository hateIngredientRepository;

    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private HateIngredientService hateIngredientService;

    @Autowired
    private FollowService followService;

    @Autowired
    private Helper helper;

    @Autowired
    private S3helper s3helper;

    @Value("${rest-api-key}") String clientId;

    @Value("${redirect-uri}") String redirectUri;

    @Value("${client-secret}") String clientSecret;

    @Value("${member-default-profile-image}") String defaultProfileImage;


    @GetMapping("/{memberId}")
    @JsonView(MemberViews.Private.class)
    public ResponseEntity<GetInfoDto> getMemberInfo(@PathVariable Long memberId){
        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        return ResponseEntity.ok(new GetInfoDto(
                member.getNickname(),
                s3helper.getS3ImageUrl(member.getProfileImageFilename()),
                member.getBirthday(),
                member.getEmail(),
                member.getHouse().getHouseCode(),
                member.getFollowCount()
        ));
    }

    @PostMapping("/check-duplicate")
    public ResponseEntity<CheckNicknameIsDuplicateDto> checkDuplicate(@RequestParam("nickname") String nickname){
        if(!memberService.existsByNickname(nickname)){
            return ResponseEntity.ok(new CheckNicknameIsDuplicateDto("Unique nickname.", nickname));
        }
        else{
            return new ResponseEntity<CheckNicknameIsDuplicateDto>(
                    new CheckNicknameIsDuplicateDto("Already exists", nickname),
                    HttpStatus.CONFLICT
            );
        }
    }

    @PutMapping("/{memberId}")
    @JsonView(MemberViews.Private.class)
    public ResponseEntity<SingleNicknameDto> modifyMemberInfo(@RequestParam("nickname") String nickname, @PathVariable Long memberId){
        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        if(memberService.existsByNickname(nickname)) throw new CustomException(ErrorCode.Duplicate_Nickname);
        return ResponseEntity.ok(new SingleNicknameDto(member.getNickname()));
    }

    @PostMapping("/{memberId}/hate-ingredient/{ingredientId}")
    public ResponseEntity<HateIngredientDto> addInedibleIngredient(@PathVariable Long memberId, @PathVariable Short ingredientId){
        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));


        String ingredientName = hateIngredientService.ingredientName(ingredientId);
        HateIngredientDto response = new HateIngredientDto(ingredientId, ingredientName);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{memberId}/hate-ingredient")
    public ResponseEntity<HateIngredientListDto> getInedibleIngredientList(@PathVariable Long memberId){
        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        List<HateIngredient> ingredientList = hateIngredientRepository.findByMember(member);
        List<String> ingredientNames = new ArrayList<String>();
        Map<String, Object> apiresponse = new HashMap<String, Object>();
        for(HateIngredient ingredient : ingredientList){
            Short id = ingredient.getIngredientId();
            String name = hateIngredientService.ingredientName(id);
            ingredientNames.add(name);
        }
        HateIngredientListDto response = new HateIngredientListDto(ingredientNames);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{memberId}/hate-ingredient/{ingredientId}")
    public ResponseEntity<SimpleResponseDto> deleteInedibleIngredient(@PathVariable Long memberId, @PathVariable Short ingredientId){
        Member member = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        List<HateIngredient> ingredientList = hateIngredientRepository.findByMemberAndIngredientId(member, ingredientId);
        for(HateIngredient ingredient : ingredientList){
            Integer id = ingredient.getHateIngredientTblId();
            hateIngredientRepository.deleteByHateIngredientTblId(id);
        }
        SimpleResponseDto response = new SimpleResponseDto("Deleted");
        return ResponseEntity.ok(response);
    }

    @PostMapping("{followerId}/follow/{followeeId}")
    public ResponseEntity<ResponseDto> ResponseFollowOrUnfollow(@PathVariable Long followerId, @PathVariable Long followeeId){
        Member follower = memberService.findByMemberId(followerId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        Member followee = memberService.findByMemberId(followeeId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));

        boolean flag = followService.followOrUnfollow(follower, followee);
        //data 내용 작성
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("flag", flag);

        //response
        ResponseDto response = ResponseDto
                .builder()
                .message("ok")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("{memberId}/follow")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<ResponseDto> getFolloweeList(@PathVariable Long memberId){
        Member follower = memberService.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.No_Such_Member));
        List<GetInfoDto> followees = followService.getFolloweeList(follower);
        //data 내용 작성
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("followees", followees);

        //response
        ResponseDto response = ResponseDto
                .builder()
                .message("ok")
                .data(data)
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<ResponseDto> kakaoLoginAndGetUserInfo(@RequestBody AuthorizationRequest request) throws JsonProcessingException {

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
        String id_token = (String) KakaoAuthResponse.get("id_token");

        //
        String kakaoGetUserInfoUrl = "https://kapi.kakao.com/v2/user/me";
        Map<String, Object> kakaoUserInfo = helper.getKakaoUserInfo(access_token);

        Long memberId = (Long) kakaoUserInfo.get("id");
        Map<String, Object> userInfo = (Map<String, Object>) kakaoUserInfo.get("kakao_account");

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("id",  memberId);
        data.put("email", userInfo.getOrDefault("email", "No Email"));
        data.put("birthday", userInfo.getOrDefault("birthday", "9999"));
        data.put("accessToken", access_token);
        data.put("refreshToken", refresh_token);

        ResponseDto response = ResponseDto.
                builder().
                message("OK").
                data(data).
                build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<ResponseDto> signup(@RequestBody SignupRequest request){
        Long memberId = request.getMemberId();
        String nickname = request.getNickname();
        String houseCode = request.getHouseCode();
        String birthday = request.getBirthday();
        String email = request.getEmail();

        House house = houseRepository.findByHouseCode(houseCode).orElseThrow(
                () -> new CustomException(ErrorCode.No_Such_House)
        );
        Member member = Member
                .builder()
                .memberId(memberId)
                .nickname(nickname)
                .house(house)
                .birthday(birthday)
                .email(email)
                .build();
        member = memberService.save(member);

        ResponseDto response = ResponseDto
                .builder()
                .message("OK")
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("{memberId}/withdrawal")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<ResponseDto> withDrawal(@PathVariable Long memberId, HttpServletRequest request) throws JsonProcessingException {
        Long kakaoId = memberService.validateToken(request);
        if(Long.compare(kakaoId, memberId) != 0) throw new CustomException(ErrorCode.No_Valid_Token);
        if(!memberService.kakaoLogout(request, memberId)) throw new CustomException(ErrorCode.Logout_Failure);

        memberService.deleteByMemberId(memberId);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("status", true);

        ResponseDto response = ResponseDto
                .builder()
                .message("OK")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<ResponseDto> kakaoLogout(HttpServletRequest request, @RequestBody SingleMemberRequest requestBody) throws JsonProcessingException {

        Long memberId = requestBody.getMemberId();

        if(!memberService.kakaoLogout(request, memberId)) throw new CustomException(ErrorCode.Logout_Failure);

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("status", true);
        ResponseDto response = ResponseDto
                .builder()
                .message("OK")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }

//    @PostMapping("/image/{name}")
//    public ResponseEntity<?> testImagePost(@PathVariable String name, @RequestParam MultipartFile image) throws Exception{
//        String fileName = s3helper.upload("test", name, image);
//        return ResponseEntity.ok(fileName);
//    }

    @PutMapping("/{memberId}/profile-image")
    @JsonView(ResponseViews.NoRequest.class)
    public ResponseEntity<ResponseDto> modifyProfileImageProfile(@PathVariable Long memberId, @RequestParam MultipartFile profileImage) throws Exception {
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

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("status", true);

        ResponseDto response = ResponseDto
                .builder()
                .message("ok")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }
}
