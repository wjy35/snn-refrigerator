package com.ssafy.alarm.service.impl;

import com.ssafy.alarm.db.entity.MemberFcmTokenEntity;
import com.ssafy.alarm.db.repository.MemberFcmTokenRepository;
import com.ssafy.alarm.service.MemberFcmTokenSaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberMemberFcmTokenSaveServiceImpl implements MemberFcmTokenSaveService {
    private final MemberFcmTokenRepository memberFcmTokenRepository;

    @Override
    public void save(MemberFcmTokenEntity memberFcmTokenEntity) {
        memberFcmTokenRepository.save(memberFcmTokenEntity);
    }
}
