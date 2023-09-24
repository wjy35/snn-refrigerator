package com.ssafy.chat.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.chat.api.request.ChatPublish;
import com.ssafy.chat.api.response.ChatParam;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatMessageListener implements MessageListener {
    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try{
            ChatPublish chatPublish = (ChatPublish)redisTemplate.getValueSerializer().deserialize(message.getBody());
            ChatParam chatParam = new ChatParam();
            chatParam.setMemberId(chatPublish.getMemberId());
            chatParam.setContent(chatPublish.getContent());
            chatParam.setTimestamp(chatPublish.getTimestamp());

            simpMessageSendingOperations.convertAndSend(
                    chatPublish.getDestination(),
                    objectMapper.writeValueAsString(chatParam)
            );
        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
