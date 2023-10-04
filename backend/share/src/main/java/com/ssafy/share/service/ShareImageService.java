package com.ssafy.share.service;

import com.ssafy.share.db.entity.ShareImage;

import java.util.List;
import java.util.Map;

public interface ShareImageService {
    ShareImage save(ShareImage shareImage);

    List<Map<String, Object>> convertShareImages(List<ShareImage> shareImages);
}
