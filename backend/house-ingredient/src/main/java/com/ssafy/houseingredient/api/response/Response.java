package com.ssafy.houseingredient.api.response;

import java.util.HashMap;

public class Response {
    private String message;
    private HashMap<String,Object> data;

    public Response() {
        this.data = new HashMap<>();
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public HashMap<String, Object> getData() {
        return data;
    }

    public void addData(Object data) {
        this.data.put(toResponseString(data),data);
    }

    private String toResponseString(Object data){
        String dataName = data.getClass().getSimpleName();
        return dataName.substring(0,1).toLowerCase()+dataName.substring(1);
    }
}
