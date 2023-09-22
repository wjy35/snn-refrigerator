package com.ssafy.share.service;

import com.ssafy.share.api.request.ShareBoardUpdateRequest;
import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.api.request.ShareIngredientRequest;
import com.ssafy.share.api.response.MemberResponse;
import com.ssafy.share.db.entity.SharePost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ShareBoardService {

    public MemberResponse getMember(Long memberId);
    public String getLocationName(Short locationId);

    public String getIngredientInfoName(Short ingredientInfoId);

    public Page<SharePost> getPostList(Pageable pageable, Short locationId, String keyword);

    public SharePost getPostDetail(Long shareBoardId);

    SharePost save(List<MultipartFile> imageFiles, List<ShareIngredientRequest> shareIngredientRequests
            , ShareBoardWriteRequest shareBoardWriteRequest);

    SharePost update(Long shareBoardId, List<MultipartFile> imageFiles, List<ShareIngredientRequest> shareIngredientRequests
            ,ShareBoardUpdateRequest shareBoardUpdateRequest);

    void delete(Long shareBoardId);

    SharePost findBySharePostId(Long sharePostId);
}
