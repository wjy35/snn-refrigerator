package com.ssafy.share.api.controller;

import com.ssafy.share.api.request.ShareBoardUpdateRequest;
import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.api.request.ShareIngredientRequest;
import com.ssafy.share.api.response.*;
import com.ssafy.share.db.entity.ShareIngredient;
import com.ssafy.share.db.entity.SharePost;
import com.ssafy.share.service.ShareBoardService;
import com.ssafy.share.util.TimeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ShareBoardController {

    private final ShareBoardService shareBoardService;
    private final TimeUtil timeUtil;


    @GetMapping("/{locationId}")
    public ResponseEntity<?> getPostList(@PathVariable Short locationId, @RequestParam(required = false) String keyword,
                                         @PageableDefault(sort = "sharePostId", size = 5, direction = Sort.Direction.DESC) Pageable pageable){ // 게시글 리스트 조회, 키워드 검색 가능
        Response response = new Response();
        String locationName=shareBoardService.getLocationName(locationId);
        Page<SharePost> posts=shareBoardService.getPostList(pageable,locationId,keyword);

        List<SharePostResponse> sharePostResponses=new ArrayList<>();
        for(SharePost post:posts){
            MemberResponse memberResponse=shareBoardService.getMember(post.getMemberId());
            String nickname=memberResponse.getNickname();
            String userProfileImageUrl=memberResponse.getProfileImageUrl();
            sharePostResponses.add(new SharePostResponse(post,nickname,userProfileImageUrl,timeUtil.dateTypeConverter(post.getCreateDate())));
        }
        response.setMessage("OK");
        response.addRequest("locationId",locationId);
        response.addRequest("keyword",keyword);
        response.addData("response", new SharePostListResponse(locationName,sharePostResponses));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/detail/{shareBoardId}") // getPostList()와 요청 형식이 겹쳐서 이렇게 만들었음
    public ResponseEntity<?> getPostDetail(@PathVariable Long shareBoardId){
        Response response = new Response();
        SharePost post=shareBoardService.getPostDetail(shareBoardId);
        String nickname=shareBoardService.getMember(post.getMemberId()).getNickname();
        SharePostDetailResponse sharePostDetailResponse=new SharePostDetailResponse(post,nickname,timeUtil.dateTypeFormatter(post.getCreateDate()));
        for (ShareIngredient s:post.getShareIngredients()){
            String ingredientName= shareBoardService.getIngredientInfoName(s.getIngredientInfoId());
            sharePostDetailResponse.getShareIngredients().add(new ShareIngredientResponse(ingredientName,s.getAmount()));
        }
        sharePostDetailResponse.setLocationName(shareBoardService.getLocationName(post.getLocationId()));
        response.setMessage("OK");
        response.addRequest("shareBoardId",shareBoardId);
        response.addData("response", sharePostDetailResponse);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> writePost(@RequestPart(value = "imageFiles",required = false) List<MultipartFile> imageFiles,
                               @RequestPart(value = "shareIngredients") List<ShareIngredientRequest> shareIngredientRequests,
                               @RequestPart(value = "shareBoardWriteRequest") ShareBoardWriteRequest shareBoardWriteRequest, HttpServletRequest request) {
        Response response = new Response();
        log.info("shareIngredientRequests = {}",shareIngredientRequests);
        log.info("shareBoardWriteRequest = {}",shareBoardWriteRequest);
        shareBoardService.save(imageFiles,shareIngredientRequests,shareBoardWriteRequest);
        response.setMessage("OK");
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @PatchMapping("/{shareBoardId}")
    public ResponseEntity<?> updatePost(@PathVariable Long shareBoardId,@RequestPart(value = "imageFiles",required = false) List<MultipartFile> imageFiles,
                                @RequestPart(value = "shareIngredients") List<ShareIngredientRequest> shareIngredientRequests,
                                @RequestPart(value = "shareBoardUpdateRequest") ShareBoardUpdateRequest shareBoardUpdateRequest, HttpServletRequest request) {
        log.info("shareIngredientRequests = {}",shareIngredientRequests);
        Response response = new Response();
        shareBoardService.update(shareBoardId,imageFiles,shareIngredientRequests,shareBoardUpdateRequest);
        response.setMessage("OK");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{shareBoardId}")
    public ResponseEntity<?> updatePost(@PathVariable Long shareBoardId,HttpServletRequest request){
        Response response = new Response();
        shareBoardService.delete(shareBoardId);
        response.setMessage("OK");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
