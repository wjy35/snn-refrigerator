package com.ssafy.share.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.share.api.request.ShareBoardUpdateRequest;
import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.api.request.ShareIngredientRequest;
import com.ssafy.share.api.response.IngredientResponse;
import com.ssafy.share.api.response.MemberResponse;
import com.ssafy.share.db.entity.SharePost;
import com.ssafy.share.db.repository.ShareBoardRepository;
import com.ssafy.share.db.repository.ShareImageRepository;
import com.ssafy.share.db.repository.ShareIngredientRepository;
import com.ssafy.share.feign.IngredientFeign;
import com.ssafy.share.feign.LocationFeign;
import com.ssafy.share.feign.MemberFeign;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ShareBoardServiceImpl implements ShareBoardService {

    private final ShareBoardRepository shareBoardRepository;
    private final ShareIngredientRepository shareIngredientRepository;
    private final ShareImageRepository shareImageRepository;
    private final MemberFeign memberFeign;
    private final LocationFeign locationFeign;
    private final IngredientFeign ingredientFeign;
    private final ObjectMapper objectMapper;

    @Override
    public Optional<SharePost> findById(Long id){
        return shareBoardRepository.findById(id);
    }

    @Override
    public MemberResponse getMember(Long memberId){
       return Optional.of(objectMapper.convertValue(memberFeign.getMemberDetail(memberId).getData()
                        .get("memberInfo"),MemberResponse.class))
                        .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다. ID: " + memberId));
    }

    @Override
    public String getLocationName(Short locationId) {
        return Optional.of(objectMapper.convertValue(locationFeign.getLocationName(locationId).getData()
                        .get("locationName"),String.class))
                        .orElseThrow(() -> new IllegalArgumentException("장소을 찾을 수 없습니다. ID: " + locationId));
    }

    @Override
    public String getIngredientInfoName(Short ingredientInfoId) {
        return Optional.of(objectMapper.convertValue(ingredientFeign.getIngredientInfoName(ingredientInfoId).getData()
                        .get("ingredientInfo"),IngredientResponse.class).getIngredientInfoName())
                .orElseThrow(() -> new IllegalArgumentException("식재료를 찾을 수 없습니다. ID: " + ingredientInfoId));
    }

    @Override
    public SharePost findBySharePostId(Long shareBoardId) { // id로 나눔글 1건 조회
        return shareBoardRepository.findBySharePostId(shareBoardId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 게시글을 찾을 수 없습니다. ID: " + shareBoardId));
    }

    @Override
    public List<SharePost> getPostList(Short locationId, String keyword) { // 나눔글 리스트 조회
        log.info("검색 키워드: {}",keyword);
        if(keyword==null) return shareBoardRepository.findByLocationId(locationId); // 초기화면 or 검색어 없을 때 전체 조회
        return shareBoardRepository.findByLocationIdAndTitleContaining(locationId,keyword); // 검색어를 입력했을 때
    }

    @Override
    public SharePost getPostDetail(Long shareBoardId) {
        return shareBoardRepository.findBySharePostId(shareBoardId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다. ID: " + shareBoardId));
    }

    @Override
    @Transactional
    public SharePost save(SharePost sharePost) {
        return shareBoardRepository.save(sharePost);
    }

    @Override
    public Map<String, Object> convertSharePost(SharePost sharePost) throws IllegalAccessException {
        Map<String, Object> mp = new HashMap<>();
        mp.put("sharePostId", sharePost.getSharePostId());
        mp.put("locationId", sharePost.getLocationId());
        mp.put("title", sharePost.getTitle());
        mp.put("content", sharePost.getContent());
        mp.put("thumbnail", sharePost.getThumbnail());
        mp.put("modifiedDate", sharePost.getModifiedDate());
        mp.put("createdDate", sharePost.getCreateDate());
        return mp;
    }


    @Override
    public SharePost updatePost(SharePost sharePost, ShareBoardWriteRequest postRequest){
        sharePost.setMemberId(postRequest.getMemberId());
        sharePost.setLocationId(postRequest.getLocationId());
        sharePost.setTitle(postRequest.getTitle());
        sharePost.setContent(postRequest.getContent());
        return shareBoardRepository.save(sharePost);
    }

    @Override
    @Transactional
    public SharePost shareWriteSave(List<ShareIngredientRequest> shareIngredientRequests, List<String> images,
                                    ShareBoardWriteRequest shareBoardWriteRequest) { // 나눔글 등록

        SharePost post=shareBoardWriteRequest.toEntity(); // post 엔티티 생성
        post.setShareIngredients(shareIngredientRequests);
//        post.setShareImages(images);
        return shareBoardRepository.save(post);
    }

//    @Override
//    @Transactional
//    public ShareImage shareImageSave(SharePost sharePost, List<String> images){
//        for(String image: images){
//            ShareImage shareImage = ShareImage
//                    .builder()
//                    .sharePost(sharePost)
//                    .sharePostImageUrl(image)
//                    .build();
//            shareImageRepository.save(shareImage);
//        }
//
//    }

//    @Override
//    @Transactional
//    public ShareImage shareProfileSave(SharePost sharePost, String thumbnailUrl){
//        sharePost.
//    }

    @Override
    @Transactional
    public SharePost update(Long shareBoardId, List<ShareIngredientRequest> shareIngredientRequests, List<String> images,
                            ShareBoardUpdateRequest shareBoardUpdateRequest) {

        SharePost post=shareBoardRepository.findBySharePostId(shareBoardId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 게시글을 찾을 수 없습니다. ID: " + shareBoardId));

        // 기존의 나눔식재료와 사진은 삭제
        shareIngredientRepository.deleteBySharePost(post);
        shareImageRepository.deleteBySharePost(post);

        post.setShareIngredients(shareIngredientRequests);
        post.setShareImages(images);

//        for(ShareIngredientRequest s:shareIngredientRequests){ // 나눔식재료 하나하나 post 등록
//            s.setSharePost(post);
//            ShareIngredient shareIngredient=s.toEntity();
//            shareBoardUpdateRequest.getShareIngredients().add(shareIngredient);
//        }

        post.update(shareBoardUpdateRequest);
        return post;
    }

    @Override
    @Transactional
    public void delete(Long shareBoardId) {
        shareBoardRepository.deleteById(shareBoardId);
    }
}
