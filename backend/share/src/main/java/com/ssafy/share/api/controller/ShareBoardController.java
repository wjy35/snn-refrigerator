package com.ssafy.share.api.controller;

import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.api.request.ShareIngredientRequest;
import com.ssafy.share.api.response.ShareBoardPostResponse;
import com.ssafy.share.db.entity.SharePost;
import com.ssafy.share.service.ShareBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ShareBoardController {

    private final ShareBoardService shareBoardService;

    @GetMapping("")
    public List<ShareBoardPostResponse> getPostList(@RequestParam(required = false) String keyword){ // 게시글 리스트 조회, 키워드 검색 가능
        return null;
    }

//    @GetMapping("/{shareboardId}")
//    public SharePost getPostDetail(@PathVariable Long shareboardId){
//
//    }

    @PostMapping("")
    public SharePost writePost(@RequestPart(value = "imageFiles",required = false) List<MultipartFile> imageFiles,
                               @RequestPart(value = "shareIngredients") List<ShareIngredientRequest> shareIngredientRequests,
                               @RequestPart(value = "shareBoardWriteRequest") ShareBoardWriteRequest shareBoardWriteRequest, HttpServletRequest request) {
        log.info("shareIngredientRequests = {}",shareIngredientRequests);
        log.info("shareBoardWriteRequest = {}",shareBoardWriteRequest);
        return shareBoardService.save(imageFiles,shareIngredientRequests,shareBoardWriteRequest);
    }
}
