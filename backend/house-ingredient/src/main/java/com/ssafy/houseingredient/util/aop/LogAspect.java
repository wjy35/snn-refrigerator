package com.ssafy.houseingredient.util.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Slf4j
@Component
@Aspect
public class LogAspect {

    @Pointcut("execution(* com.ssafy.houseingredient.*.*(..))")
    private void cut(){}

    @Before("cut()")
    public void beforeParameterLog(JoinPoint joinPoint) {
        Method method = getMethod(joinPoint);
        System.out.println("a@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        log.debug("------> method name = {} 진입", method.getName());
        Object[] args = joinPoint.getArgs();
        if (args.length <= 0) log.debug("no parameter");
        for (Object arg : args) {
            log.debug("parameter type = {}", arg.getClass().getSimpleName());
            log.debug("parameter value = {}", arg.toString());
        }
    }

    @AfterReturning(value = "cut()", returning = "returnObj")
    public void afterReturnLog(JoinPoint joinPoint, Object returnObj) {
        Method method = getMethod(joinPoint);

        if(returnObj == null) return;

        log.debug("------> method name = {} 종료", method.getName());
        log.debug("return type = {}", returnObj.getClass().getSimpleName());
        log.debug("return value = {}", returnObj.toString());
    }

    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }

}