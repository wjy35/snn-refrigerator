package com.ssafy.share.service;

import com.ssafy.share.db.entity.ShareImage;
import com.ssafy.share.db.entity.SharePost;

import java.util.List;
import java.util.Map;

public interface ShareImageService {
    ShareImage save(ShareImage shareImage);

    void deleteBySharePost(SharePost sharePost);

    Map<String, Object> convertShareImage(ShareImage shareImage);
}
