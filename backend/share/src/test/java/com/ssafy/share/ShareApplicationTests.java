package com.ssafy.share;

import com.ssafy.share.feign.LocationFeign;
import com.ssafy.share.feign.MemberFeign;
import com.ssafy.share.service.ShareBoardServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Slf4j
@SpringBootTest
class ShareApplicationTests {

    @Autowired
    MemberFeign memberFeign;
    @Autowired
    LocationFeign locationFeign;
    @Autowired
    ShareBoardServiceImpl shareBoardService;

    @Test
    void memberFeginTest() {
        log.info("{}",shareBoardService.getMember(3027437248L));
    }

    @Test
    void locationFeginTest() {
        log.info("{}",shareBoardService.getLocationName((short) 235));
    }

    @Test
    void ingredientFeginTest() {
        log.info("{}",shareBoardService.getIngredientInfoName((short) 1));
    }

}
