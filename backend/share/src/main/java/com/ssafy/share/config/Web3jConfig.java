package com.ssafy.share.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.ECKeyPair;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

import java.math.BigInteger;

@Configuration
public class Web3jConfig {
    @Bean
    public Web3j web3j() {
        return Web3j.build(new HttpService("https://gethrpc.ssafy-blockchain.com"));
    }

    @Bean
    public Credentials credentials() {
        BigInteger privateKeyInBT = new BigInteger("3e3411017c28c00d47bbfc21550c5f99a240ba6ba54e0d4002587ed6a3b57297", 16);
        return Credentials.create(ECKeyPair.create(privateKeyInBT));
    }

}
