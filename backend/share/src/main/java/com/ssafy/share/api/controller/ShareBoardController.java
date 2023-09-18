package com.ssafy.share.api.controller;

import com.ssafy.share.api.request.ShareBoardUpdateRequest;
import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.api.request.ShareIngredientRequest;
import com.ssafy.share.api.response.ShareBoardPostResponse;
import com.ssafy.share.db.entity.SharePost;
import com.ssafy.share.service.ShareBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ShareBoardController {

    private final ShareBoardService shareBoardService;

    @GetMapping("")
    public List<ShareBoardPostResponse> getPostList(@RequestParam(required = false) String keyword,
                                                    @PageableDefault(sort = "sharePostId", size = 5, direction = Sort.Direction.DESC) Pageable pageable){ // 게시글 리스트 조회, 키워드 검색 가능
        Page<SharePost> posts=shareBoardService.getPostList(pageable,keyword);
//        return posts.stream().map(ShareBoardPostResponse::new).collect(toList());
        return null;
    }

//    @GetMapping("/{shareboardId}")
//    public SharePost getPostDetail(@PathVariable Long shareboardId){
//
//    }

    @PostMapping("")
    public String writePost(@RequestPart(value = "imageFiles",required = false) List<MultipartFile> imageFiles,
                               @RequestPart(value = "shareIngredients") List<ShareIngredientRequest> shareIngredientRequests,
                               @RequestPart(value = "shareBoardWriteRequest") ShareBoardWriteRequest shareBoardWriteRequest, HttpServletRequest request) {
        log.info("shareIngredientRequests = {}",shareIngredientRequests);
        log.info("shareBoardWriteRequest = {}",shareBoardWriteRequest);
        return "나눔글 작성 성공";
    }

    @PatchMapping("/{shareboardId}")
    public String updatePost(@PathVariable Long shareboardId,@RequestPart(value = "imageFiles",required = false) List<MultipartFile> imageFiles,
                                @RequestPart(value = "shareIngredients") List<ShareIngredientRequest> shareIngredientRequests,
                                @RequestPart(value = "shareBoardUpdateRequest") ShareBoardUpdateRequest shareBoardUpdateRequest, HttpServletRequest request) {
        log.info("shareIngredientRequests = {}",shareIngredientRequests);
        shareBoardService.update(shareboardId,imageFiles,shareIngredientRequests,shareBoardUpdateRequest);
        return "나눔글 수정 성공";
    }

    @DeleteMapping("/{shareboardId}")
    public String updatePost(@PathVariable Long shareboardId,HttpServletRequest request){
        shareBoardService.delete(shareboardId);
        return "나눔글 삭제 성공";
    }


}
