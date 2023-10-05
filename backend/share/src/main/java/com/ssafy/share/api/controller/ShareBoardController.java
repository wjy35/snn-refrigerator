package com.ssafy.share.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.share.api.request.*;
import com.ssafy.share.api.response.*;
import com.ssafy.share.blockchain.BasicService;
import com.ssafy.share.db.entity.ShareHistory;
import com.ssafy.share.db.entity.ShareImage;
import com.ssafy.share.db.entity.ShareIngredient;
import com.ssafy.share.db.entity.SharePost;
import com.ssafy.share.db.repository.ShareHistoryRepository;
import com.ssafy.share.service.S3Service;
import com.ssafy.share.service.ShareBoardService;
import com.ssafy.share.service.ShareImageService;
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
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ShareBoardController {

    private final ShareBoardService shareBoardService;
    private final ShareHistoryRepository shareHistoryRepository;
    private final ShareImageService shareImageService;
    private final ShareIngredientService shareIngredientService;
    private final S3Service s3Service;
    private final BasicService basicService;
    private final TimeUtil timeUtil;

    @GetMapping("/{locationId}/{pageNum}/{items}")
    public ResponseEntity<?> getPostList(@PathVariable Short locationId, @PathVariable(required = false) Short pageNum,
                                         @PathVariable(required = false) Short items,
                                         @RequestParam(required = false) String keyword){ // 게시글 리스트 조회, 키워드 검색 가능
        Response response = new Response();
        String locationName=shareBoardService.getLocationName(locationId);
        List<SharePost> posts=shareBoardService.getPostList(locationId,keyword);
        List<SharePostResponse> sharePostResponses=new ArrayList<>();
        for(int i = pageNum*items; i < pageNum*items+items && i < posts.size(); i++){
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
        String thumbnailUrl = s3Service.getS3ImageUrl(post.getThumbnail());
//        SharePostDetailResponse sharePostDetailResponse=new SharePostDetailResponse(post,nickname,timeUtil.dateTypeFormatter(post.getCreateDate()), thumbnailUrl);
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
    public ResponseEntity<?> writePost(@RequestBody WritePostRequest request) throws IOException, IllegalAccessException {
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
            log.info(String.valueOf(ingredientRequest.getIngredientInfoId()));
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
    public ResponseEntity<?> ImagePost(@PathVariable Long shareBoardId, @RequestPart(value = "imageFiles",required = false) List<MultipartFile> imageFiles) throws IOException {
        Response response = new Response();
        List<String> imageUrls = new ArrayList<>();
        if(imageFiles != null) {
            for (MultipartFile m : imageFiles) {
                imageUrls.add(s3Service.upload("share", m.getOriginalFilename(), m));
            }
        }

        SharePost sharePost = shareBoardService.findById(shareBoardId).orElseThrow();
        String thumbnailUrl = imageUrls.get(0);

        sharePost.setThumbnail(thumbnailUrl);
        shareBoardService.save(sharePost);

        imageUrls = imageUrls.subList(1, imageUrls.size());

        SharePost sharePost = shareBoardService.findById(shareBoardId).orElseThrow();

        List<ShareImage> images = new ArrayList<>();

        for(String image: imageUrls) {
            ShareImage shareImage = ShareImage
                    .builder()
                    .sharePostImageUrl(image)
                    .sharePost(sharePost)
                    .build();
            images.add(shareImageService.save(shareImage));
        }
        response.setMessage("OK");
        response.addData("images", shareImageService.convertShareImages(images));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/thumbnail/shareboard/{shareBoardId}")
    public ResponseEntity<?> ThumbnailPost(@PathVariable Long shareBoardId, @RequestPart(value = "thumbnail",required = false) MultipartFile thumbnail) throws IOException, IllegalAccessException {
        Response response = new Response();
        String imageUrl = s3Service.upload("share/thumbnail", thumbnail.getOriginalFilename(),thumbnail);
        SharePost sharePost = shareBoardService.findById(shareBoardId).orElseThrow();

        sharePost.setThumbnail(imageUrl);
        shareBoardService.save(sharePost);
        response.setMessage("OK");
        response.addData("sharePost", shareBoardService.convertSharePost(sharePost));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/content/{shareBoardId}")
    public ResponseEntity<?> updatePost(@PathVariable Long shareBoardId, @RequestBody WritePostRequest request) throws IOException, IllegalAccessException {
        Response response = new Response();

        //속성 분리

        ShareBoardWriteRequest postRequest = request.getShareBoardWriteRequest();
        List<ShareIngredientRequest> ingredientRequests = request.getShareIngredients();

        //sharePost 얻기
        SharePost sharePost = shareBoardService.findById(shareBoardId).orElseThrow();

        //sharePost 수정
        sharePost = shareBoardService.updatePost(sharePost, postRequest);

        //해당 sharePost의 shareIngredient 삭제
        shareIngredientService.deleteBySharePost(sharePost);

        //해당 ShareIngredient 세팅

        List<ShareIngredient> ingredients = new ArrayList<>();

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

        response.setMessage("OK");
        response.addData("ingredientList", shareIngredientService.convertIngredients(ingredients));
        response.addData("sharePost", shareBoardService.convertSharePost(sharePost));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/image/shareboard/{shareBoardId}")
    public ResponseEntity<?> ImagePatch(@PathVariable Long shareBoardId, @RequestPart(value = "imageFiles",required = false) List<MultipartFile> imageFiles) throws IOException {
        Response response = new Response();
        List<String> imageUrls = new ArrayList<>();
        if(imageFiles != null) {
            for (MultipartFile m : imageFiles) {
                imageUrls.add(s3Service.upload("share", m.getOriginalFilename(), m));
            }
        }

        SharePost sharePost = shareBoardService.findById(shareBoardId).orElseThrow();

        //기존의 이미지 삭제
        shareImageService.deleteBySharePost(sharePost);

        List<ShareImage> images = new ArrayList<>();

        for(String image: imageUrls) {
            ShareImage shareImage = ShareImage
                    .builder()
                    .sharePostImageUrl(image)
                    .sharePost(sharePost)
                    .build();
            images.add(shareImageService.save(shareImage));
        }
        response.setMessage("OK");
        response.addData("images", shareImageService.convertShareImages(images));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/thumbnail/shareboard/{shareBoardId}")
    public ResponseEntity<?> ThumbnailPatch(@PathVariable Long shareBoardId, @RequestPart(value = "thumbnail",required = false) MultipartFile thumbnail) throws IOException, IllegalAccessException {
        Response response = new Response();
        String imageUrl = s3Service.upload("share/thumbnail", thumbnail.getOriginalFilename(), thumbnail);
        SharePost sharePost = shareBoardService.findById(shareBoardId).orElseThrow();

        sharePost.setThumbnail(imageUrl);
        shareBoardService.save(sharePost);
        response.setMessage("OK");
        response.addData("sharePost", shareBoardService.convertSharePost(sharePost));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/detail/{shareBoardId}")
    public ResponseEntity<?> deletePost(@PathVariable Long shareBoardId,HttpServletRequest request){
        Response response = new Response();
        shareBoardService.delete(shareBoardId);
        response.setMessage("OK");
        response.addData("status", true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/reserve-share")
    public ResponseEntity<?> reserveSharing(@RequestBody ShareRequest shareRequest){
        Response response = new Response();
        ShareHistory shareHistory=shareHistoryRepository.save(ShareHistory.builder()
                .giverId(shareRequest.getGiverId())
                .takerId(shareRequest.getTakerId()).build());
        response.setMessage("OK");
        response.addRequest("giverId",shareRequest.getGiverId());
        response.addRequest("takerId",shareRequest.getTakerId());
        response.addData("response", new ShareReserveResponse(shareHistory.getShareHistoryId()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PatchMapping("/complete-share/{shareHistoryId}")
    @Transactional
    public ResponseEntity<?> completeSharing(@PathVariable Long shareHistoryId){
        Response response = new Response();
        ShareHistory shareHistory = shareHistoryRepository.findById(shareHistoryId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 약속입니다."));
        if(shareHistory.getIsCompleted()==true){
            throw new IllegalArgumentException("이미 완료된 나눔입니다.");
        }
        shareHistory.complete();
        response.setMessage("OK");
        response.addRequest("shareHistoryId",shareHistoryId);
        response.addData("response", new ShareCompleteResponse(shareHistory.getShareHistoryId(),shareHistory.getIsCompleted(),shareHistory.getCompletedTime()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get-share-count/{giverId}")
    public int getShareCount(@PathVariable Long giverId) throws IOException, ExecutionException, InterruptedException {
        return basicService.getShareCount(shareBoardService.getMember(giverId).getNickname());
    }
    @GetMapping("/get-take-count/{takerId}")
    public int getTakeCount(@PathVariable Long takerId) throws IOException, ExecutionException, InterruptedException {
        return basicService.getTakeCount(shareBoardService.getMember(takerId).getNickname());
    }
    @GetMapping("/get-share-history/{type}/{memberId}/{pageNum}/{items}")
    public ResponseEntity<?> getShareHistory(@PathVariable String type,@PathVariable Long memberId,@PathVariable(required = false) Short pageNum,
                                @PathVariable(required = false) Short items) {
        Response response = new Response();
        List<ShareHistory> shareHistories=new ArrayList<>();
        if(type.equals("give")){ //
            shareHistories=shareHistoryRepository.findByGiverId(memberId);
        }
        if(type.equals("take")){
            shareHistories=shareHistoryRepository.findByTakerId(memberId);
        }
        List<ShareHistoryResponse> result=new ArrayList<>();
        for(int i=pageNum*items;i<pageNum*items+items;i++){
            ShareHistory s=shareHistories.get(i);
            result.add(new ShareHistoryResponse(s.getShareHistoryId(),
                    shareBoardService.getMember(s.getGiverId()).getNickname(),
                    shareBoardService.getMember(s.getTakerId()).getNickname(),s.getIsCompleted(),s.getCompletedTime()));
        }
        response.setMessage("OK");
        response.addRequest("memberId",memberId);
        response.addRequest("type",type);
        response.addData("response", result);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/get-take-record/{memberId}/{pageNum}/{items}")
    public void getTakeHistory(@PathVariable Long memberId,@PathVariable(required = false) Short pageNum,
                               @PathVariable(required = false) Short items){

    }
}
