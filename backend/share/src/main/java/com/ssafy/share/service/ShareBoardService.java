package com.ssafy.share.service;

import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.api.request.ShareIngredientRequest;
import com.ssafy.share.db.entity.SharePost;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ShareBoardService {
    SharePost save(List<MultipartFile> imageFiles, List<ShareIngredientRequest> shareIngredientRequests
            , ShareBoardWriteRequest shareBoardWriteRequest);

    SharePost findBySharePostId(Long sharePostId);
}
