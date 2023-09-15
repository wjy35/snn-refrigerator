package com.ssafy.share.config;

import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;

// @Configuration 절대 쓰면 안됨
public class HeaderConfiguration {
    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> requestTemplate.header("header", "header1", "header2");
    }

}
