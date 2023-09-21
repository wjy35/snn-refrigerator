package com.ssafy.share.api.controller;

import com.ssafy.share.api.request.ShareBoardUpdateRequest;
import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.api.request.ShareIngredientRequest;
import com.ssafy.share.api.response.*;
import com.ssafy.share.db.entity.IngredientInfo;
import com.ssafy.share.db.entity.LocationInfo;
import com.ssafy.share.db.entity.ShareIngredient;
import com.ssafy.share.db.entity.SharePost;
import com.ssafy.share.db.repository.IngredientInfoRepository;
import com.ssafy.share.db.repository.LocationInfoRepository;
import com.ssafy.share.feign.MemberFeign;
import com.ssafy.share.service.ShareBoardService;
import com.ssafy.share.util.TimeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ShareBoardController {

    private final ShareBoardService shareBoardService;
    private final LocationInfoRepository locationInfoRepository;
    private final IngredientInfoRepository ingredientInfoRepository;
    private final TimeUtil timeUtil;


    @GetMapping("/{locationId}")
    public SharePostListResponse getPostList(@PathVariable Short locationId,@RequestParam(required = false) String keyword,
                                               @PageableDefault(sort = "sharePostId", size = 5, direction = Sort.Direction.DESC) Pageable pageable){ // 게시글 리스트 조회, 키워드 검색 가능
        LocationInfo locationInfo=locationInfoRepository.findByLocationId(locationId)
                .orElseThrow(() -> new IllegalArgumentException("장소를 찾을 수 없습니다. ID: " + locationId));
        Page<SharePost> posts=shareBoardService.getPostList(pageable,locationInfo,keyword);

        List<SharePostResponse> sharePostResponses=new ArrayList<>();
        for(SharePost post:posts){
            MemberResponse memberResponse=shareBoardService.getMember(post.getMemberId());
            String nickname=memberResponse.getNickname();
            String userProfileImageUrl=memberResponse.getProfileImageUrl();
            sharePostResponses.add(new SharePostResponse(post,nickname,userProfileImageUrl,timeUtil.dateTypeConverter(post.getCreateDate())));
        }
        return new SharePostListResponse(locationInfo.getLocationName(),sharePostResponses);
    }

    @GetMapping("/detail/{shareBoardId}") // getPostList()와 요청 형식이 겹쳐서 이렇게 만들었음
    public SharePostDetailResponse getPostDetail(@PathVariable Long shareBoardId){
        SharePost post=shareBoardService.getPostDetail(shareBoardId);
        String nickname=shareBoardService.getMember(post.getMemberId()).getNickname();
        SharePostDetailResponse response=new SharePostDetailResponse(post,nickname,timeUtil.dateTypeFormatter(post.getCreateDate()));
        for (ShareIngredient s:post.getShareIngredients()){
            String ingredientName=ingredientInfoRepository.findById(s.getIngredientInfoId())
                    .orElseThrow(()-> new IllegalArgumentException("존재하지 않는 식재료입니다.")).getIngredientName();
            response.getShareIngredients().add(new ShareIngredientResponse(ingredientName,s.getAmount()));
        }
        return response;
    }

    @PostMapping("")
    public String writePost(@RequestPart(value = "imageFiles",required = false) List<MultipartFile> imageFiles,
                               @RequestPart(value = "shareIngredients") List<ShareIngredientRequest> shareIngredientRequests,
                               @RequestPart(value = "shareBoardWriteRequest") ShareBoardWriteRequest shareBoardWriteRequest, HttpServletRequest request) {
        log.info("shareIngredientRequests = {}",shareIngredientRequests);
        log.info("shareBoardWriteRequest = {}",shareBoardWriteRequest);
        shareBoardService.save(imageFiles,shareIngredientRequests,shareBoardWriteRequest);
        return "나눔글 작성 성공";
    }

    @PatchMapping("/{shareBoardId}")
    public String updatePost(@PathVariable Long shareBoardId,@RequestPart(value = "imageFiles",required = false) List<MultipartFile> imageFiles,
                                @RequestPart(value = "shareIngredients") List<ShareIngredientRequest> shareIngredientRequests,
                                @RequestPart(value = "shareBoardUpdateRequest") ShareBoardUpdateRequest shareBoardUpdateRequest, HttpServletRequest request) {
        log.info("shareIngredientRequests = {}",shareIngredientRequests);
        shareBoardService.update(shareBoardId,imageFiles,shareIngredientRequests,shareBoardUpdateRequest);
        return "나눔글 수정 성공";
    }

    @DeleteMapping("/{shareBoardId}")
    public String updatePost(@PathVariable Long shareBoardId,HttpServletRequest request){
        shareBoardService.delete(shareBoardId);
        return "나눔글 삭제 성공";
    }

}
