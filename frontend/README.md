# Spring Boot Chatbot

A full-stack ChatGPT-style chatbot application built with **Spring Boot, React, TypeScript, MySQL, OpenAI, and Google Gemini APIs**.

---

# 🚀 Tech Stack

## Backend

* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* MySQL
* OpenAI API
* Google Gemini API
* Apache PDFBox
* Apache POI
* Maven

## Frontend

* React
* TypeScript
* Vite
* Framer Motion
* React Markdown
* React Syntax Highlighter
* React Icons
* React Hot Toast
* Fetch API

---

# ✨ Features

## 💬 Chat Features

* Create New Chat
* Persistent Chat History
* Conversation Sidebar
* Rename Conversation
* Delete Conversation
* Conversation Search
* Auto Conversation Title Generation
* Auto Scroll to Latest Message
* Streaming AI Responses (SSE)
* Loading Indicator
* Copy Response Button
* Like / Dislike Messages
* AI Provider Selection (OpenAI / Gemini)

---

## 🔐 Authentication Features

* User Registration
* User Login
* JWT Authentication
* Secure REST APIs
* Multi-user Support
* User-specific Conversations
* User-specific File Access

---

## 📁 File Features

* PDF Upload Support
* DOCX Upload Support
* Multiple File Upload
* Drag & Drop File Upload
* File Size Validation
* Upload Files per Conversation
* Retrieve Uploaded Files
* Delete Uploaded Files
* Store Files in MySQL
* Conversation-specific File Context
* PDF Text Extraction
* DOCX Text Extraction

---

## 🎨 UI Features

* Modern ChatGPT-style Interface
* Dark Mode
* Light Mode
* Responsive Layout
* Glassmorphism Effects
* Sidebar Search
* User and Assistant Avatars
* Login & Signup UI
* Auto Growing Text Area
* Toast Notifications
* File Upload Chips
* Drag & Drop Overlay

---

## 📝 Message Rendering

* Markdown Support
* Syntax Highlighting
* Code Block Rendering
* Inline Code Styling

---

## 🗄️ Data Persistence

* Conversations stored in MySQL
* Messages stored in MySQL
* Uploaded Files stored in MySQL
* Conversation History Retrieval
* Conversation Management

---

# 📁 Project Structure

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
│   ├── config
│   │   ├── SecurityConfig.java
│   │   └── JwtAuthenticationFilter.java
│   │
│   ├── dto
│   └── src/main/resources
│
├── frontend
│   ├── components
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── ChatWindow.tsx
│   │   ├── ChatInput.tsx
│   │   ├── Message.tsx
│   │   ├── Avatar.tsx
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

# 🔗 Backend APIs

## Authentication APIs

```http
POST /api/auth/register
POST /api/auth/login
```

## Conversation APIs

```http
POST   /api/conversations
GET    /api/conversations
GET    /api/conversations/{id}/messages
POST   /api/conversations/{id}/message
POST   /api/conversations/{id}/stream
PUT    /api/conversations/{id}
DELETE /api/conversations/{id}
```

## File APIs

```http
POST   /api/files/upload/{conversationId}
GET    /api/files/{conversationId}
DELETE /api/files/{fileId}
```

## Message Reaction APIs

```http
POST /api/conversations/messages/{id}/like
POST /api/conversations/messages/{id}/dislike
```

---

# ⚙️ Run Backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend URL:

```text
http://localhost:8081
```

---

# 💻 Run Frontend

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

# 🗄️ Database

Tables:

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

# 🔑 Environment Variables

Configure the following properties inside `application.properties`:

```properties
# OpenAI
openai.api.key=YOUR_OPENAI_API_KEY

# Google Gemini
gemini.api.key=YOUR_GEMINI_API_KEY

# JWT
jwt.secret=YOUR_SECRET_KEY
jwt.expiration=86400000

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/chatbot
spring.datasource.username=root
spring.datasource.password=your_password
```

---

# 🤖 Supported AI Providers

| Provider                | Status |
| ----------------------- | ------ |
| OpenAI GPT-4o Mini      | ✅      |
| Google Gemini 2.5 Flash | ✅      |

---

# 📌 Current Status

## ✅ Completed

* JWT Authentication
* User Registration/Login
* Multi-user Support
* Conversation Management
* Message Persistence
* Rename Conversation
* Delete Conversation
* OpenAI Integration
* Gemini Integration
* Streaming Responses
* File Upload Support
* PDF Upload Support
* DOCX Upload Support
* Drag & Drop Upload
* Multiple File Upload
* File Size Validation
* Markdown Rendering
* Syntax Highlighting
* Theme Toggle
* Auto Growing Text Area
* Auto Scroll
* Search Conversations
* Like / Dislike Messages
* Toast Notifications
* Responsive UI

---

# 👨‍💻 Author

**Mihir Sahu**

Software Engineer | Spring Boot | React | TypeScript
