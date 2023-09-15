package com.ssafy.share.service;

import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.api.request.ShareIngredientRequest;
import com.ssafy.share.db.entity.SharePost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ShareBoardService {

    @Transactional(readOnly = true)
    public Page<SharePost> getPostList(Pageable pageable, String keyword);


    SharePost save(List<MultipartFile> imageFiles, List<ShareIngredientRequest> shareIngredientRequests
            , ShareBoardWriteRequest shareBoardWriteRequest);

    SharePost findBySharePostId(Long sharePostId);
}
