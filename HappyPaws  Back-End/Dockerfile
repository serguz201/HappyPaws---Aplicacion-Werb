FROM openjdk:22
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=target/HappyPawsBack-End-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} HappyPawsBack-End.jar
ENTRYPOINT ["java", "-jar", "/HappyPawsBack-End.jar"]