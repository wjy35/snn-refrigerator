package com.ssafy.chat.api.controller;

import com.ssafy.chat.api.request.ChatPublish;
import com.ssafy.chat.service.ChatSendService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatMessageListener implements MessageListener {
    private final RedisTemplate redisTemplate;
    private final ChatSendService chatSendService;
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try{
            ChatPublish chatPublish = (ChatPublish)redisTemplate.getValueSerializer().deserialize(message.getBody());

            chatSendService.sendForDetail(chatPublish);
            chatSendService.sendForList(chatPublish);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
