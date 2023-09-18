FROM gradle:8.2.1-jdk11 as build
WORKDIR /app

COPY ./backend/member-manage/settings.gradle ./
COPY ./backend/member-manage/build.gradle ./
COPY ./backend/member-manage/src ./src

RUN gradle build -x test --parallel

FROM azul/zulu-openjdk:11
WORKDIR /app

COPY --from=build /app/build/libs/*.jar ./app.jar
EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/app.jar"]