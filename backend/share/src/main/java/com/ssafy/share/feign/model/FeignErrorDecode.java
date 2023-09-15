package com.ssafy.share.feign.model;

import feign.Response;
import feign.RetryableException;
import feign.codec.ErrorDecoder;
import io.netty.handler.codec.http.HttpStatusClass;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static java.lang.String.format;
/**
 * <pre>
 *  요청 결과가 5xx 대 에러라면, 요청을 다시 시도 한다.
 *  단, {@link com.ssafy.share.config.FeignRetryConfiguration} 을 feign client 에 설정 해야한다.
 * </pre>
 */
@Slf4j
@NoArgsConstructor
public class FeignErrorDecode implements ErrorDecoder {
    /**
     * <dl>
     * <dt>5xx 에러가 지속적으로 발생한다면</dt>
     * <dd>RetryableException 발생하고, 더이상 Retry 를 할 수 없을때 여기서 throw 한 RetryableException 이 응답으로 내려간다.</dd>
     * </dl>
     */
    @Override
    public Exception decode(String methodKey, Response response) {

        log.error("{} 요청이 성공하지 못했습니다. status: {} requestUrl: {}, requestBody: {}, responseBody: {}",
                response.status(), methodKey, response.request().url(), FeignResponseUtils.getRequestBody(response), FeignResponseUtils.getResponseBody(response));

        if (isRetry(response)) {
//            return new RetryableException(format("%s 요청이 성공하지 못했습니다. Retry 합니다. - status: %s, headers: %s", methodKey, response.status(), response.headers()), null);
        }
        // int status, String message, HttpMethod httpMethod, Date retryAfter, Request request
        return new IllegalStateException(format("%s 요청이 성공하지 못했습니다. - cause: %s, headers: %s", methodKey, response.status(), response.headers()));
    }

    /**
     * 4XX, 5XX 에러이면서, GET 요청에 대해서만 retry 한다. 그 이외의 경우에 retry 가 필요하면 별도의 configuration class 에서 ErrorDecoder 를 설정한다.
     */
    private boolean isRetry(Response response) {
        if (!response.request().method().equalsIgnoreCase("GET")) {
            return false;
        }

        return HttpStatusClass.SERVER_ERROR.contains(response.status()) || HttpStatusClass.CLIENT_ERROR.contains(response.status());
    }

}
