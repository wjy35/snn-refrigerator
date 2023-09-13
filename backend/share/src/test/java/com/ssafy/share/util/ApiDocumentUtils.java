package com.ssafy.share.util;

import org.springframework.restdocs.operation.preprocess.OperationRequestPreprocessor;
import org.springframework.restdocs.operation.preprocess.OperationResponsePreprocessor;

import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;

public interface ApiDocumentUtils {
//    static OperationRequestPreprocessor getDocumentRequest() {
//        return preprocessRequest(
//                modifyUris() // url 를 기본값인 http://localhost:8080 에서 https://docs.api.com 으로 변경
//                        .scheme("https")
//                        .host("docs.api.com")
//                        .removePort(),
//                prettyPrint()); // request를 예쁘게 출력하기 위해 사용
//    }
//
//    static OperationResponsePreprocessor getDocumentResponse() {
//        return preprocessResponse(prettyPrint()); // response를 예쁘게 출력하기 위해 사용
//    }
}
