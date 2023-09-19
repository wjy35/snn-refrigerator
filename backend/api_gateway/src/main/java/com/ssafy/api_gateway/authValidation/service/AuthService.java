package com.ssafy.api_gateway.authValidation.service;

import javax.servlet.http.HttpServletRequest;

public interface AuthService{
    String getToken(HttpServletRequest request);
    Long validateToken(HttpServletRequest request);
}
