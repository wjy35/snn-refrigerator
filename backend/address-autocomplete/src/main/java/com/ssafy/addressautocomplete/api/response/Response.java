package com.ssafy.addressautocomplete.api.response;

import java.util.HashMap;

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

    public String getMessage() {
        return message;
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

    @Override
    public String toString() {
        return "Response{" +
                "message='" + message + '\'' +
                ", data=" + data +
                '}';
    }
}
