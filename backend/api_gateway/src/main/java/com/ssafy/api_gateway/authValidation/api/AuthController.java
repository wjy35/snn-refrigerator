package com.ssafy.api_gateway.authValidation.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.api_gateway.authValidation.response.Response;
import com.ssafy.api_gateway.authValidation.service.AuthServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class AuthController {

    private final AuthServiceImpl authService;

    @PostMapping("/auth-validation")
    public ResponseEntity<Response> authValidate(HttpServletRequest request) throws JsonProcessingException {
        Long kakaoId = authService.validateToken(request);

        /*
        //The code which check weather this meber is same as kakao User.

        if(Long.compare(kakaoId, memberId) != 0){
            throw new Exception(ErrorCode.Invalid_Member);
        }

         */


//        If user is valid, then you will get below response.

//        {
//            "message": "ok",
//            "data":{
//                "status": true
//            }
//        }
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("status", true);

        Response response = Response
                .builder()
                .message("ok")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }

}
