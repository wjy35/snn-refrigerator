package com.ssafy.share;

import com.ssafy.share.feign.MemberFeign;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Slf4j
@SpringBootTest
class ShareApplicationTests {

    @Autowired
    MemberFeign memberFeign;

    @Test
    void memberFeginTest() {
        log.info("{}",memberFeign.getMemberDetail(3027437248L));
    }

}
