package com.ssafy.houseingredient.api.response;

import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;

@Getter
@ToString
public class Response {
    private String message;
    private HashMap<String,Object> request, data;

    public Response() {
        this.request = new HashMap<>();
        this.data = new HashMap<>();
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public HashMap<String, Object> getRequest() {
        return request;
    }

    public void addRequest(String key, Object data) {
        this.request.put(key,data);
    }

    public HashMap<String, Object> getData() {
        return data;
    }

    public void addData(String key, Object data) {
        this.data.put(key,data);
    }

}
