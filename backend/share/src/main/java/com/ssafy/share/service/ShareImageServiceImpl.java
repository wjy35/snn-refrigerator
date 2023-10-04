package com.ssafy.share.service;

import com.ssafy.share.db.entity.ShareImage;
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
    public List<Map<String, Object>> convertShareImages(List<ShareImage> shareImages){
        List<Map<String, Object>> result = new ArrayList<>();
        for(ShareImage shareImage : shareImages){
            Map<String, Object> mp = new HashMap<>();
            mp.put("imageUrl", shareImage.getSharePostImageUrl());
            result.add(mp);
        }
        return result;
    }
}
