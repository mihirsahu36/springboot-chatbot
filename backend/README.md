````md
# Spring Boot Chatbot Backend

A full-stack AI chatbot backend built with Spring Boot that powers a ChatGPT-style application with persistent conversations, JWT authentication, multi-user support, file uploads, and multiple AI providers (OpenAI & Gemini).

---

## 🚀 Tech Stack

- Java 19+
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- MySQL
- Maven
- OpenAI API
- Google Gemini API

---

## ✨ Features

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- BCrypt Password Encryption
- Protected REST APIs

### 💬 Conversation Management

- Create Conversation
- Get User Conversations
- Rename Conversation
- Delete Conversation
- Automatic Conversation Title Generation

### 📝 Message Management

- Store User Messages
- Store Assistant Responses
- Retrieve Conversation History
- Persistent Chat Storage
- Like / Dislike Messages

### 🤖 AI Integration

- OpenAI Integration
- Gemini Integration
- Provider Selection Support (`OpenAI` / `Gemini`)
- Conversation Context Support
- Graceful Fallback Responses

### 📁 File Upload

- Upload Text Files
- Persist Files in MySQL
- Associate Files with Conversations
- Retrieve Uploaded Files
- Delete Uploaded Files
- Uploaded Files Used as Chat Context

### 👥 Multi-user Support

- User-specific Conversations
- User-specific Messages
- User-specific Uploaded Files
- Secure API Access

---

## 📁 Project Structure

```text
backend
│
├── src/main/java/com/springboot_chatbot
│
├── controller
│   ├── AuthController.java
│   ├── ConversationController.java
│   └── FileUploadController.java
│
├── service
│   ├── AuthService.java
│   ├── JwtService.java
│   ├── ConversationService.java
│   └── ChatBotService.java
│
├── repository
│   ├── UserRepository.java
│   ├── ConversationRepository.java
│   ├── MessageRepository.java
│   └── UploadedFileRepository.java
│
├── entity
│   ├── User.java
│   ├── Conversation.java
│   ├── Message.java
│   └── UploadedFile.java
│
├── dto
│   ├── LoginRequest.java
│   ├── RegisterRequest.java
│   ├── AuthResponse.java
│   ├── PromptRequest.java
│   ├── SendMessageRequest.java
│   ├── RenameConversationRequest.java
│   ├── ChatBotRequest.java
│   ├── ChatBotResponse.java
│   ├── GeminiRequest.java
│   └── GeminiResponse.java
│
├── config
│   ├── SecurityConfig.java
│   ├── JwtAuthenticationFilter.java
│   └── RestClientConfig.java
│
├── SpringbootChatbotApplication.java
│
└── src/main/resources
    └── application.properties

pom.xml
````

---

## 🗄️ Database Tables

### users

| Column   | Type    |
| -------- | ------- |
| id       | BIGINT  |
| username | VARCHAR |
| email    | VARCHAR |
| password | VARCHAR |

### conversations

| Column     | Type      |
| ---------- | --------- |
| id         | BIGINT    |
| title      | VARCHAR   |
| created_at | TIMESTAMP |
| user_id    | BIGINT    |

### messages

| Column          | Type      |
| --------------- | --------- |
| id              | BIGINT    |
| role            | VARCHAR   |
| content         | LONGTEXT  |
| liked           | BOOLEAN   |
| disliked        | BOOLEAN   |
| timestamp       | TIMESTAMP |
| conversation_id | BIGINT    |

### uploaded_files

| Column          | Type     |
| --------------- | -------- |
| id              | BIGINT   |
| file_name       | VARCHAR  |
| content         | LONGTEXT |
| conversation_id | BIGINT   |

---

## 🔐 Authentication APIs

### Register User

```http
POST /api/auth/register
```

Request:

```json
{
  "username": "mihir",
  "email": "mihir@test.com",
  "password": "password123"
}
```

### Login User

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "mihir@test.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "jwt_token",
  "username": "mihir"
}
```

---

## 💬 Conversation APIs

### Create Conversation

```http
POST /api/conversations
```

### Get User Conversations

```http
GET /api/conversations
```

### Get Conversation Messages

```http
GET /api/conversations/{id}/messages
```

### Send Message

```http
POST /api/conversations/{id}/message
```

Request:

```json
{
  "prompt": "Explain Spring Boot",
  "provider": "gemini"
}
```

Supported providers:

* `openai`
* `gemini`

### Rename Conversation

```http
PUT /api/conversations/{id}
```

### Delete Conversation

```http
DELETE /api/conversations/{id}
```

---

## 📁 File APIs

### Upload File

```http
POST /api/files/upload/{conversationId}
```

### Get Uploaded Files

```http
GET /api/files/{conversationId}
```

### Delete File

```http
DELETE /api/files/{fileId}
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

openapi.api.model=gpt-4o-mini
openai.api.key=${OPENAI_API_KEY}

gemini.api.key=${GEMINI_API_KEY}
gemini.api.model=gemini-2.5-flash

jwt.secret=${JWT_SECRET}
jwt.expiration=86400000
```

---

## ▶️ Run Application

### Build Project

```bash
mvn clean install
```

### Start Application

```bash
./mvnw spring-boot:run
```

Backend URL:

```text
http://localhost:8081
```

---

## 📌 Current Status

### ✅ Completed

* JWT Authentication
* User Registration/Login
* Multi-user Support
* Conversation CRUD
* Message Persistence
* OpenAI Integration
* Gemini Integration
* File Upload Support
* Like / Dislike Messages
* Persistent Chat History
* MySQL Integration

### 🚧 Planned

* Streaming Responses
* Drag & Drop File Upload
* Image Upload Support
* RAG Implementation
* Vector Database Integration (Chroma / pgvector)
* Docker Deployment
* Role-based Access Control

---

## 👨‍💻 Author

**Mihir Sahu**

Software Engineer | Spring Boot | React | TypeScript
