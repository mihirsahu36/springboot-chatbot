# Spring Boot Chatbot Backend

A Spring Boot REST API that powers a ChatGPT-style chatbot application with conversation management, message persistence, MySQL integration, and OpenAI support.

## 🚀 Tech Stack

- Java 19+
- Spring Boot
- Spring Data JPA
- MySQL
- Maven
- OpenAI API

---

## ✨ Features

### Conversation Management

- Create Conversation
- Get All Conversations
- Rename Conversation
- Delete Conversation

### Message Management

- Store User Messages
- Store Assistant Responses
- Retrieve Conversation History
- Persistent Chat Storage

### Database Integration

- MySQL Database
- JPA/Hibernate
- Automatic Schema Updates

### AI Integration

- OpenAI Chat Completions API
- Conversation Context Support
- Fallback Mock Responses

---

## 📁 Project Structure

```text
backend
│
├── src/main/java/com/springboot_chatbot
│
├── controller
│   └── ConversationController.java
│
├── service
│   ├── ConversationService.java
│   └── ChatBotService.java
│
├── repository
│   ├── ConversationRepository.java
│   └── MessageRepository.java
│
├── entity
│   ├── Conversation.java
│   └── Message.java
│
├── dto
│   ├── MessageResponse.java
│   ├── SendMessageRequest.java
│   └── RenameConversationRequest.java
│
├── config
│   ├── CorsConfig.java
│   └── OpenAPIConfiguration.java
│
├── SpringbootChatbotApplication.java
│
└── src/main/resources
    └── application.properties

pom.xml
```

---

## 🗄️ Database Tables

### conversations

| Column | Type |
|----------|----------|
| id | BIGINT |
| title | VARCHAR |
| created_at | TIMESTAMP |

### messages

| Column | Type |
|----------|----------|
| id | BIGINT |
| role | VARCHAR |
| content | TEXT |
| timestamp | TIMESTAMP |
| conversation_id | BIGINT |

---

## 🔗 REST APIs

### Create Conversation

```http
POST /api/conversations
```

Response

```json
{
  "id": 1,
  "title": "New Chat"
}
```

---

### Get All Conversations

```http
GET /api/conversations
```

---

### Get Conversation Messages

```http
GET /api/conversations/{id}/messages
```

---

### Send Message

```http
POST /api/conversations/{id}/message
```

Request

```json
{
  "prompt": "What is Spring Boot?"
}
```

Response

```json
"Spring Boot is a Java framework..."
```

---

### Rename Conversation

```http
PUT /api/conversations/{id}
```

Request

```json
{
  "title": "Spring Boot Notes"
}
```

---

### Delete Conversation

```http
DELETE /api/conversations/{id}
```

Response

```http
204 No Content
```

---

## ⚙️ Configuration

### application.properties

```properties
server.port=8081

spring.datasource.url=jdbc:mysql://localhost:3306/chatbot
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

openapi.api.url=https://api.openai.com/v1/chat/completions
openapi.api.model=gpt-4o-mini

openai.api.key=${OPENAI_API_KEY}
```

---

## ▶️ Run Application

### Build Project

```bash
mvn clean install
```

### Start Application

```bash
.\mvnw.cmd spring-boot:run
```

Backend URL:

```text
http://localhost:8081
```

---

## 📌 Current Status

### ✅ Completed

- Conversation CRUD
- Message Persistence
- MySQL Integration
- OpenAI Integration
- Rename Conversation
- Delete Conversation
- Conversation History Retrieval
- CORS Configuration

### 🚧 Planned

- Auto Conversation Title Generation
- Message Feedback (Like / Dislike)
- Streaming Responses
- JWT Authentication
- Multi-user Support
- Role-based Access Control

---

## 👨‍💻 Author

**Mihir Sahu**

Software Engineer | Spring Boot | React | TypeScript
