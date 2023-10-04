package com.ssafy.share.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.share.api.request.ShareBoardUpdateRequest;
import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.api.request.ShareIngredientRequest;
import com.ssafy.share.api.request.WritePostRequest;
import com.ssafy.share.api.response.*;
import com.ssafy.share.db.entity.ShareImage;
import com.ssafy.share.db.entity.ShareIngredient;
import com.ssafy.share.db.entity.SharePost;
import com.ssafy.share.service.S3Service;
import com.ssafy.share.service.ShareBoardService;
import com.ssafy.share.service.ShareIngredientService;
import com.ssafy.share.util.TimeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ShareBoardController {

    private final ShareBoardService shareBoardService;
    private final ShareIngredientService shareIngredientService;
    private final S3Service s3Service;
    private final TimeUtil timeUtil;

    @GetMapping("/{locationId}/{pageNum}/{items}")
    public ResponseEntity<?> getPostList(@PathVariable Short locationId, @PathVariable(required = false) Short pageNum,
                                         @PathVariable(required = false) Short items,
                                         @RequestParam(required = false) String keyword,
                                         @PageableDefault(sort = "sharePostId", size = 5, direction = Sort.Direction.DESC) Pageable pageable){ // 게시글 리스트 조회, 키워드 검색 가능
        Response response = new Response();
        String locationName=shareBoardService.getLocationName(locationId);
        List<SharePost> posts=shareBoardService.getPostList(locationId,keyword);
        List<SharePostResponse> sharePostResponses=new ArrayList<>();
        for(int i=pageNum*items;i<pageNum*items+items;i++){
            MemberResponse memberResponse=shareBoardService.getMember(posts.get(i).getMemberId());
            String nickname=memberResponse.getNickname();
            String userProfileImageUrl=memberResponse.getProfileImageUrl();

            sharePostResponses.add(new SharePostResponse(posts.get(i),nickname,userProfileImageUrl,
                    timeUtil.dateTypeConverter(posts.get(i).getCreateDate()),s3Service.getS3ImageUrl(posts.get(i).getThumbnail())));
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
        for (ShareImage s:post.getShareImages()){
            sharePostDetailResponse.getShareImages().add(s3Service.getS3ImageUrl(s.getSharePostImageUrl()));
        }

        sharePostDetailResponse.setLocationName(shareBoardService.getLocationName(post.getLocationId()));
        response.setMessage("OK");
        response.addRequest("shareBoardId",shareBoardId);
        response.addData("response", sharePostDetailResponse);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/content")
    public ResponseEntity<?> writePost(@RequestBody WritePostRequest request) throws IOException {
        Response response = new Response();
        ObjectMapper mapper = new ObjectMapper();

        //속성 분리

        ShareBoardWriteRequest postRequest = request.getShareBoardWriteRequest();
        List<ShareIngredientRequest> ingredientRequests = request.getShareIngredients();

        //SharePost 생성
        SharePost sharePost = SharePost
                .builder()
                .memberId(postRequest.getMemberId())
                .locationId(postRequest.getLocationId())
                .title(postRequest.getTitle())
                .content(postRequest.getContent())
                .build();
        sharePost = shareBoardService.save(sharePost);

        List<ShareIngredient> ingredients = new ArrayList<>();

        //ShareIngredient 세팅
        for(ShareIngredientRequest ingredientRequest : ingredientRequests){
            ShareIngredient ingredient = ShareIngredient
                    .builder()
                    .ingredientInfoId(ingredientRequest.getIngredientInfoId())
                    .amount(ingredientRequest.getAmount())
                    .sharePost(sharePost)
                    .build();
            ingredient = shareIngredientService.save(ingredient);
            ingredients.add(ingredient);
        }

        response.addData("ingredientList", shareIngredientService.convertIngredients(ingredients));
        response.addData("sharePost", shareBoardService.convertSharePost(sharePost));
        response.setMessage("OK");
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @PostMapping("/image/shareboard/{shareBoardId}")
    public ResponseEntity<?> ImagePost(@PathVariable @RequestPart(value = "imageFiles",required = false) List<MultipartFile> imageFiles){
        List<String> images = new ArrayList<>();
        if(imageFiles != null) {
            for (MultipartFile m : imageFiles) {
                images.add(s3Service.upload("share", m.getOriginalFilename(), m));
            }
        }
        return
    }

    @PatchMapping("/{shareBoardId}")
    public ResponseEntity<?> updatePost(@PathVariable Long shareBoardId,@RequestPart(value = "imageFiles",required = false) List<MultipartFile> imageFiles,
                                @RequestPart(value = "shareIngredients") List<ShareIngredientRequest> shareIngredientRequests,
                                @RequestPart(value = "shareBoardUpdateRequest") ShareBoardUpdateRequest shareBoardUpdateRequest, HttpServletRequest request) throws IOException {
        log.info("shareIngredientRequests = {}",shareIngredientRequests);
        Response response = new Response();
        List<String> images=new ArrayList<>();
        if(imageFiles != null) {
            for (MultipartFile m : imageFiles) {
                images.add(s3Service.upload("share", m.getOriginalFilename(), m));
            }
        }
        shareBoardService.update(shareBoardId,shareIngredientRequests,images,shareBoardUpdateRequest);
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
