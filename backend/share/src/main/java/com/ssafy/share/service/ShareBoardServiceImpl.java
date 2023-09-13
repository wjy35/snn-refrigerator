package com.ssafy.share.service;

import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.api.request.ShareIngredientRequest;
import com.ssafy.share.db.entity.ShareImage;
import com.ssafy.share.db.entity.ShareIngredient;
import com.ssafy.share.db.entity.SharePost;
import com.ssafy.share.db.repository.ShareBoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ShareBoardServiceImpl implements ShareBoardService {

    private final ShareBoardRepository shareBoardRepository;

    @Override
    public SharePost save(List<MultipartFile> imageFiles, List<ShareIngredientRequest> shareIngredientRequests,
                          ShareBoardWriteRequest shareBoardWriteRequest) {

        List<ShareImage> images=null;

        if(imageFiles != null){
            shareBoardWriteRequest.setShareImages(images);
            // todo: 이미지에 url을 뽑아내서 저장해야함
        }
        for(ShareIngredientRequest s:shareIngredientRequests){
            shareBoardWriteRequest.getShareIngredients().add(s.toEntity());
        }
        log.info("요청 dto: {}",shareBoardWriteRequest);
        return shareBoardRepository.save(shareBoardWriteRequest.toEntity());
    }
}
