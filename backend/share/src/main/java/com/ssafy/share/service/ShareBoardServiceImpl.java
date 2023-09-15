package com.ssafy.share.service;

import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.api.request.ShareIngredientRequest;
import com.ssafy.share.db.entity.LocationInfo;
import com.ssafy.share.db.entity.ShareImage;
import com.ssafy.share.db.entity.ShareIngredient;
import com.ssafy.share.db.entity.SharePost;
import com.ssafy.share.db.repository.LocationInfoRepository;
import com.ssafy.share.db.repository.MemberRepository;
import com.ssafy.share.db.repository.ShareBoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ShareBoardServiceImpl implements ShareBoardService {

    private final ShareBoardRepository shareBoardRepository;
    private final MemberRepository memberRepository;
    private final LocationInfoRepository locationInfoRepository;

    @Override
    public SharePost findBySharePostId(Long sharePostId) { // id로 나눔글 단건 조회
        return shareBoardRepository.findBySharePostId(sharePostId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 게시글을 찾을 수 없습니다. ID: " + sharePostId));
    }

    @Override
    public Page<SharePost> getPostList(Pageable pageable, String keyword) { // 나눔글 리스트 조회
        return shareBoardRepository.findAll(pageable);
    }

    @Override
    public SharePost save(List<MultipartFile> imageFiles, List<ShareIngredientRequest> shareIngredientRequests,
                          ShareBoardWriteRequest shareBoardWriteRequest) { // 나눔글 등록

        List<ShareImage> images=null;

        if(imageFiles != null){
            shareBoardWriteRequest.setShareImages(images);
            // todo: 이미지에 url을 뽑아내서 저장해야함
        }
        Short locationId=shareBoardWriteRequest.getLocationId();
        LocationInfo locationInfo=locationInfoRepository.findByLocationId(locationId)
                        .orElseThrow(() -> new IllegalArgumentException("장소를 찾을 수 없습니다. ID: " + locationId));
        shareBoardWriteRequest.setLocationInfo(locationInfo);
        for(ShareIngredientRequest s:shareIngredientRequests){
            shareBoardWriteRequest.getShareIngredients().add(s.toEntity());
        }
        log.info("요청 dto: {}",shareBoardWriteRequest);
        return shareBoardRepository.save(shareBoardWriteRequest.toEntity());
    }
}
