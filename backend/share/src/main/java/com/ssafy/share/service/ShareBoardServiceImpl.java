package com.ssafy.share.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.share.api.request.ShareBoardUpdateRequest;
import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.api.request.ShareIngredientRequest;
import com.ssafy.share.api.response.IngredientResponse;
import com.ssafy.share.api.response.MemberResponse;
import com.ssafy.share.db.entity.ShareImage;
import com.ssafy.share.db.entity.ShareIngredient;
import com.ssafy.share.db.entity.SharePost;
import com.ssafy.share.db.repository.ShareBoardRepository;
import com.ssafy.share.db.repository.ShareIngredientRepository;
import com.ssafy.share.feign.IngredientFeign;
import com.ssafy.share.feign.LocationFeign;
import com.ssafy.share.feign.MemberFeign;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ShareBoardServiceImpl implements ShareBoardService {

    private final ShareBoardRepository shareBoardRepository;
    private final ShareIngredientRepository shareIngredientRepository;
    private final MemberFeign memberFeign;
    private final LocationFeign locationFeign;
    private final IngredientFeign ingredientFeign;
    private final ObjectMapper objectMapper;

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
    public SharePost save(List<MultipartFile> imageFiles, List<ShareIngredientRequest> shareIngredientRequests,
                          ShareBoardWriteRequest shareBoardWriteRequest) { // 나눔글 등록
        List<ShareImage> images=null;

        if(imageFiles != null){
            shareBoardWriteRequest.setShareImages(images);
            // todo: 이미지에 url을 뽑아내서 저장해야함
        }

        SharePost post=shareBoardWriteRequest.toEntity(); // post 엔티티 생성
        for(ShareIngredientRequest s:shareIngredientRequests){ // 나눔식재료 하나하나 post 등록
            s.setSharePost(post);
            ShareIngredient shareIngredient=s.toEntity();
            shareBoardWriteRequest.getShareIngredients().add(shareIngredient);
        }
        return shareBoardRepository.save(post);
    }

    @Override
    @Transactional
    public SharePost update(Long shareBoardId, List<MultipartFile> imageFiles, List<ShareIngredientRequest> shareIngredientRequests,
                            ShareBoardUpdateRequest shareBoardUpdateRequest) {

        SharePost post=shareBoardRepository.findBySharePostId(shareBoardId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 게시글을 찾을 수 없습니다. ID: " + shareBoardId));

        List<ShareImage> images=null;
        if(imageFiles != null){
            shareBoardUpdateRequest.setShareImages(images);
            // todo: 이미지에 url을 뽑아내서 저장해야함
        }
        // 기존의 나눔식재료는 삭제
        shareIngredientRepository.deleteBySharePost(post);

        for(ShareIngredientRequest s:shareIngredientRequests){ // 나눔식재료 하나하나 post 등록
            s.setSharePost(post);
            ShareIngredient shareIngredient=s.toEntity();
            shareBoardUpdateRequest.getShareIngredients().add(shareIngredient);
        }

        post.update(shareBoardUpdateRequest);
        return post;
    }

    @Override
    @Transactional
    public void delete(Long shareBoardId) {
        shareBoardRepository.deleteById(shareBoardId);
    }
}
