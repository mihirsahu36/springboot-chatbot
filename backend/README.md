# Spring Boot Chatbot

A full-stack ChatGPT-style AI chatbot application built with **Spring Boot**, **React**, **TypeScript**, **MySQL**, **OpenAI**, and **Google Gemini** integration.

---

## 🚀 Tech Stack

### Backend

* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* MySQL
* OpenAI API
* Google Gemini API
* Maven

### Frontend

* React
* TypeScript
* Vite
* Framer Motion
* React Markdown
* React Syntax Highlighter
* React Icons
* React Hot Toast
* Axios

---

## ✨ Features

### 💬 Chat Features

* Create New Chat
* Persistent Chat History
* Conversation Sidebar
* Rename Conversation
* Delete Conversation
* Automatic Conversation Title Generation
* Auto Scroll to Latest Message
* Loading Indicator
* Copy Response Button
* Like / Dislike Messages
* AI Provider Selection (OpenAI / Gemini)

### 📁 File Features

* Upload Files
* Persist Uploaded Files in MySQL
* View Uploaded Files per Conversation
* Delete Uploaded Files
* Uploaded Files Used as Chat Context

### 🔐 Authentication Features

* User Registration
* User Login
* JWT Authentication
* Secure APIs
* Multi-user Support
* User-specific Conversations

### 🎨 UI Features

* Modern ChatGPT-style Interface
* Dark Mode
* Light Mode Support
* Responsive Layout
* Glassmorphism Effects
* Sidebar Search
* User and Assistant Avatars
* Toast Notifications

### 📝 Message Rendering

* Markdown Support
* Syntax Highlighting
* Code Block Rendering
* Inline Code Styling

### 🗄️ Data Persistence

* Conversations stored in MySQL
* Messages stored in MySQL
* Uploaded Files stored in MySQL
* Conversation History Retrieval

---

## 📁 Project Structure

```text
springboot-chatbot
│
├── backend
│   ├── controller
│   │   ├── AuthController.java
│   │   ├── ConversationController.java
│   │   └── FileUploadController.java
│   │
│   ├── service
│   │   ├── AuthService.java
│   │   ├── JwtService.java
│   │   ├── ConversationService.java
│   │   └── ChatBotService.java
│   │
│   ├── repository
│   │   ├── UserRepository.java
│   │   ├── ConversationRepository.java
│   │   ├── MessageRepository.java
│   │   └── UploadedFileRepository.java
│   │
│   ├── entity
│   │   ├── User.java
│   │   ├── Conversation.java
│   │   ├── Message.java
│   │   └── UploadedFile.java
│   │
│   └── dto
│
├── frontend
│   ├── components
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── ChatWindow.tsx
│   │   ├── ChatInput.tsx
│   │   ├── Message.tsx
│   │   ├── Avatar.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── TypingIndicator.tsx
│   │
│   ├── pages
│   │   └── LoginPage.tsx
│   │
│   ├── services
│   │   ├── authApi.ts
│   │   └── conversationApi.ts
│   │
│   ├── types
│   │   ├── Auth.ts
│   │   ├── Conversation.ts
│   │   └── Message.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
│
└── README.md
```

---

## 🔗 Backend APIs

### Authentication APIs

```http
POST /api/auth/register
POST /api/auth/login
```

### Conversation APIs

```http
POST   /api/conversations
GET    /api/conversations
GET    /api/conversations/{id}/messages
POST   /api/conversations/{id}/message
PUT    /api/conversations/{id}
DELETE /api/conversations/{id}
```

### File APIs

```http
POST   /api/files/upload/{conversationId}
GET    /api/files/{conversationId}
DELETE /api/files/{fileId}
```

---

## ⚙️ Configuration

### Backend `application.properties`

```properties
server.port=8081

spring.datasource.url=jdbc:mysql://localhost:3306/chatbot
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

openai.api.key=${OPENAI_API_KEY}
openapi.api.model=gpt-4o-mini

gemini.api.key=${GEMINI_API_KEY}
gemini.api.model=gemini-2.5-flash

jwt.secret=${JWT_SECRET}
jwt.expiration=86400000
```

---

## ▶️ Run Backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend URL:

```text
http://localhost:8081
```

---

## 💻 Run Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 🗄️ Database Tables

```text
users
conversations
messages
uploaded_files
```

Hibernate configuration:

```properties
spring.jpa.hibernate.ddl-auto=update
```

---

## 📌 Current Status

### ✅ Completed

* JWT Authentication
* User Registration/Login
* Multi-user Support
* Conversation CRUD
* Message Persistence
* File Upload Support
* OpenAI Integration
* Gemini Integration
* Persistent Chat History
* Rename Conversation
* Delete Conversation
* Like / Dislike Messages
* Markdown Rendering
* Syntax Highlighting
* Theme Toggle
* Toast Notifications
* Search Conversations
* Responsive UI

### 🚧 Planned

* Streaming Responses
* Drag & Drop File Upload
* Image Upload Support

---

## 👨‍💻 Author

**Mihir Sahu**

Software Engineer | Spring Boot | React | TypeScript
