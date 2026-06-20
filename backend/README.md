# Spring Boot Chatbot Backend

A simple Spring Boot REST API that sends user prompts to the OpenAI Chat Completions API and returns the generated response.

## Tech Stack

- Java
- Spring Boot
- Maven
- OpenAI API

## Project Structure

```text
backend
├── src/main/java/com/springboot_chatbot
│   ├── config
│   │   └── OpenAPIConfiguration.java
│   │
│   ├── controller
│   │   └── ChatBotController.java
│   │
│   ├── dto
│   │   ├── ChatBotRequest.java
│   │   ├── ChatBotResponse.java
│   │   └── PromptRequest.java
│   │
│   ├── service
│   │   └── ChatBotService.java
│   │
│   └── SpringbootChatbotApplication.java
│
├── src/main/resources
│   └── application.properties
│
└── pom.xml
```

## API Endpoint

### POST /api/chat

Request

```json
{
  "prompt": "What is Spring Boot?"
}
```

Response

```json
Spring Boot is a Java framework...
```

## Configuration

application.properties

```properties
server.port=8081

openapi.api.url=https://api.openai.com/v1/chat/completions
openapi.api.model=gpt-4o-mini

openai.api.key=${OPENAI_API_KEY}
```

## Run Application

```bash
mvn spring-boot:run
```

Application URL

```bash
http://localhost:8081
```
