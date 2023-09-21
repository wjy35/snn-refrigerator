package com.ssafy.membermanage.house.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.member.db.Member;

import com.ssafy.membermanage.house.dto.ModifyMemberHouseDto;
import com.ssafy.membermanage.member.db.MemberRepository;
import com.ssafy.membermanage.member.service.MemberServiceImpl;
import com.ssafy.membermanage.response.Response;
import com.ssafy.membermanage.response.ResponseViews;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/house")
public class HouseController {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberServiceImpl memberService;



}