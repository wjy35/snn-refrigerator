package com.ssafy.membermanage.util;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public class Helper {

    public Map<String, Object> ConvertObjectToMap(Object object) throws IllegalAccessException {
        Class<?> reflectionClass = object.getClass();

        Map<String, Object> res = new HashMap<String, Object>();
        Field[] fields = reflectionClass.getDeclaredFields();
        for(Field field : fields){
            res.put(field.getName(), field.get(object));
        }
        return res; //TODO: 지원해주는 메서드 있으면 그거로 바꿔놓기.
    }

    public String convertToCamelCase(String tarString){
        return Character.toString(Character.toLowerCase(tarString.charAt(0))) + tarString.substring(1);
    }

    public String getCamelCaseClassName(Object object){
        return convertToCamelCase(object.getClass().getSimpleName());
    }
}
