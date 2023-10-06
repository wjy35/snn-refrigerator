package com.ssafy.share.service;

import com.ssafy.share.db.entity.ShareImage;
import com.ssafy.share.db.entity.SharePost;
import com.ssafy.share.db.repository.ShareImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShareImageServiceImpl implements ShareImageService{
    private final ShareImageRepository shareImageRepository;

    @Override
    public ShareImage save(ShareImage shareImage){
        return shareImageRepository.save(shareImage);
    }

    @Override
    public void deleteBySharePost(SharePost sharePost){
        shareImageRepository.deleteBySharePost(sharePost);
    }

    @Override
    public Map<String, Object> convertShareImage(ShareImage shareImage){
        Map<String, Object> result = new HashMap<>();
        result.put("imageUrl", shareImage.getSharePostImageUrl());
        return result;
    }
}
