package com.ssafy.share.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.share.api.request.ShareBoardWriteRequest;
import com.ssafy.share.api.request.ShareIngredientRequest;
import com.ssafy.share.db.entity.SharePost;
import com.ssafy.share.service.ShareBoardService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Slf4j
@AutoConfigureRestDocs
@WebMvcTest(ShareBoardController.class)
class ShareBoardControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ShareBoardService shareBoardService;

    @Test
    @DisplayName("나눔글 등록 테스트")
    void save() throws Exception {
        // given
        List<ShareIngredientRequest> shareIngredientRequests=new ArrayList<>();
        shareIngredientRequests.add(new ShareIngredientRequest((short) 1,5));
        shareIngredientRequests.add(new ShareIngredientRequest((short) 2,10));
        ShareBoardWriteRequest shareBoardWriteRequest=new ShareBoardWriteRequest(1L, (short) 1,
                "감자 나눔합니다","3시에 가능함");



        // when & then
//        mockMvc.perform(post("")
//                .content(objectMapper.writeValueAsString(shareBoardWriteRequest))
//                .contentType(MediaType.APPLICATION_JSON)
//                .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andDo(document("shareBoard-save"),requestFields(fieldWithPath()))

    }

}