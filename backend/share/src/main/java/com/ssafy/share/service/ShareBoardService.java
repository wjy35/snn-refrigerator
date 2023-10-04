package com.ssafy.share.service;

import com.ssafy.share.api.request.ShareBoardUpdateRequest;
import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.api.request.ShareIngredientRequest;
import com.ssafy.share.api.response.MemberResponse;
import com.ssafy.share.db.entity.SharePost;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ShareBoardService {

    Optional<SharePost> findById(Long id);

    public MemberResponse getMember(Long memberId);
    public String getLocationName(Short locationId);

    public String getIngredientInfoName(Short ingredientInfoId);

    public List<SharePost> getPostList(Short locationId, String keyword);

    public SharePost getPostDetail(Long shareBoardId);


    SharePost updatePost(SharePost sharePost, ShareBoardWriteRequest postRequest);

    SharePost shareWriteSave(List<ShareIngredientRequest> shareIngredientRequests, List<String> images
            , ShareBoardWriteRequest shareBoardWriteRequest);

    SharePost save(SharePost sharePost);

    Map<String, Object> convertSharePost(SharePost sharePost) throws IllegalAccessException;

    SharePost update(Long shareBoardId,List<ShareIngredientRequest> shareIngredientRequests, List<String> images
            ,ShareBoardUpdateRequest shareBoardUpdateRequest);

    void delete(Long shareBoardId);

    SharePost findBySharePostId(Long sharePostId);
}
