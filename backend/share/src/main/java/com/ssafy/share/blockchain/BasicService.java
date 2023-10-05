package com.ssafy.share.blockchain;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import reactor.util.function.Tuple3;

import java.io.IOException;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.concurrent.ExecutionException;

@Slf4j
@Service
public class BasicService {
    private EthereumService ethereumService;

    public BasicService(EthereumService ethereumService)
    {
        this.ethereumService = ethereumService;
    }

    public void sendTxAndGetReceipt(Function function) throws IOException, ExecutionException, InterruptedException {
        String txHash = ethereumService.ethSendTransaction(function);
        TransactionReceipt receipt = ethereumService.getReceipt(txHash);
        log.info("receipt = {}", receipt);
    }
    public Function setFunction(String functionName){
        return new Function(functionName, Collections.emptyList(), Arrays.asList(new TypeReference<Uint256>() {}));
        }

//    public int getPot() throws IOException, ExecutionException, InterruptedException {
//
//        // 1. 호출하고자 하는 function 세팅[functionName, parameters]
//        Function function = new Function("getPot",
//                Collections.emptyList(),
//                Arrays.asList(new TypeReference<Uint256>() {}));
//
//        // 2. ethereum을 function 변수로 통해 호출
//        return ((BigInteger)ethereumService.ethCall(function)).intValue();
//    }
//
//    public void setPot(int num) throws IOException, ExecutionException, InterruptedException {
//        // 1. 호출하고자 하는 function 세팅[functionName, parameters]
//        Function function = new Function("setPot",
//                Arrays.asList(new Uint256(num)), Collections.emptyList());
//
//        // 2. sendTransaction
//        String txHash = ethereumService.ethSendTransaction(function);
//
//        // 3. getReceipt
//        TransactionReceipt receipt = ethereumService.getReceipt(txHash);
//        System.out.println("receipt = " + receipt);
//    }

    public void completeSharing(String giver, String taker) throws IOException, ExecutionException, InterruptedException {
        log.info("{} {} {}",new Utf8String(giver),new Utf8String(taker),new Utf8String(LocalDateTime.now().toString()));

        Function function = new Function("completeSharing",
                Arrays.asList(new Utf8String(giver),new Utf8String(taker),new Utf8String(LocalDateTime.now().toString())),
                Collections.emptyList());

        sendTxAndGetReceipt(function);
    }

    public int getShareCount(String giver) throws IOException, ExecutionException, InterruptedException {

        Function function = new Function("getShareCount",
                Arrays.asList(new Utf8String(giver)),
                Arrays.asList(new TypeReference<Uint256>() {}));

        return ((BigInteger)ethereumService.ethCall(function)).intValue();
    }

    public int getTakeCount(String taker) throws IOException, ExecutionException, InterruptedException {

        Function function = new Function("getTakeCount",
                Arrays.asList(new Utf8String(taker)),
                Arrays.asList(new TypeReference<Uint256>() {}));

        return ((BigInteger)ethereumService.ethCall(function)).intValue();
    }
    public String getShareRecord(String giver) throws IOException, ExecutionException, InterruptedException {

        Function function = new Function("getShareRecord",
                Arrays.asList(new Utf8String(giver)),
                Arrays.asList(new TypeReference<Utf8String>() {}));

        return null;
    }
}
