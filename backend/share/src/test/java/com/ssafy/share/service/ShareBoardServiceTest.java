package com.ssafy.share.service;

import com.ssafy.share.feign.MemberFeign;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

@Slf4j
@WebMvcTest
class ShareBoardServiceTest {


    private final MemberFeign memberFeign;

    ShareBoardServiceTest(MemberFeign memberFeign) {
        this.memberFeign = memberFeign;
    }

    @Test
    public void getMemberTest() throws Exception {
        log.info("{}",memberFeign.getMemberDetail(1L));
    }
}