package com.ssafy.share.config;


import feign.Request;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients("com.ssafy.share")
public class OpenFeignConfig {
    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> {
//            requestTemplate.header("Accept", "application/json");
            if (ArrayUtils.isEmpty(requestTemplate.body()) && !isGetOrDelete(requestTemplate)) {
                requestTemplate.body("{}");
            }
        };
    }

    private boolean isGetOrDelete(RequestTemplate requestTemplate) {
        return Request.HttpMethod.GET.name().equals(requestTemplate.method())
                || Request.HttpMethod.DELETE.name().equals(requestTemplate.method());

    }
}
