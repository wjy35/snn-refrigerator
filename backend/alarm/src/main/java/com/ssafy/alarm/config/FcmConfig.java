package com.ssafy.alarm.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FcmConfig {

    @Bean
    FirebaseMessaging firebaseMessaging() throws IOException{
        ClassPathResource resource = new ClassPathResource("google-services.json");
        InputStream serviceAccount = resource.getInputStream();

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        return FirebaseMessaging.getInstance(FirebaseApp.initializeApp(options));
    }
}
