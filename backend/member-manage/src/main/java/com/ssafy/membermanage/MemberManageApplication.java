package com.ssafy.membermanage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MemberManageApplication {

	public static void main(String[] args) {
		SpringApplication.run(MemberManageApplication.class, args);
	}

}
