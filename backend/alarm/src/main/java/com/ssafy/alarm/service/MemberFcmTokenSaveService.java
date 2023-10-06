package com.ssafy.alarm.service;

import com.ssafy.alarm.db.entity.MemberFcmTokenEntity;

public interface MemberFcmTokenSaveService {
    void save(MemberFcmTokenEntity memberFcmTokenEntity);
}
