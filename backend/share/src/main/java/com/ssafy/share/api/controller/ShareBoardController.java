package com.ssafy.share.api.controller;

import com.ssafy.share.api.request.ShareBoardPostResponse;
import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.service.ShareBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ShareBoardController {

    private final ShareBoardService shareBoardService;

    @GetMapping("")
    public List<ShareBoardPostResponse> getPostList(){
        return null;
    }


    @PostMapping("")
    public String writePost(ShareBoardWriteRequest request){

        return "ok";
    }
}
