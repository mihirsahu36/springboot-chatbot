# Spring Boot Chatbot

A full-stack ChatGPT-style chatbot application built with Spring Boot, React, TypeScript, MySQL, OpenAI, and Google Gemini integration.

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

### Chat Features

* Create New Chat
* Persistent Chat History
* Conversation Sidebar
* Rename Conversation
* Delete Conversation
* Auto Conversation Title Generation
* Auto Scroll to Latest Message
* Loading Indicator
* Copy Response Button
* Like / Dislike Messages
* AI Provider Selection (OpenAI / Gemini)

### Authentication Features

* User Registration
* User Login
* JWT Authentication
* Secure REST APIs
* Multi-user Support

### File Features

* File Upload Support
* Upload Files per Conversation
* Retrieve Uploaded Files
* Delete Uploaded Files
* Store Files in MySQL
* Conversation-specific File Context

### UI Features

* Modern ChatGPT-style Interface
* Dark Mode
* Light Mode Support
* Responsive Layout
* Glassmorphism Effects
* Sidebar Search
* User and Assistant Avatars
* Toast Notifications

### Message Rendering

* Markdown Support
* Syntax Highlighting
* Code Block Rendering
* Inline Code Styling

### Data Persistence

* Conversations stored in MySQL
* Messages stored in MySQL
* Uploaded Files stored in MySQL
* Conversation History Retrieval
* Conversation Management

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
│   ├── config
│   │   ├── SecurityConfig.java
│   │   └── JwtAuthenticationFilter.java
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
POST /api/conversations
GET /api/conversations
GET /api/conversations/{id}/messages
POST /api/conversations/{id}/message
PUT /api/conversations/{id}
DELETE /api/conversations/{id}
```

### File APIs

```http
POST /api/files/upload/{conversationId}
GET /api/files/{conversationId}
DELETE /api/files/{fileId}
```

---

## ⚙️ Run Backend

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

## 🗄️ Database

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

## 🔑 Environment Variables

Configure the following properties inside `application.properties`:

```properties
openai.api.key=YOUR_OPENAI_API_KEY

gemini.api.key=YOUR_GEMINI_API_KEY

jwt.secret=YOUR_SECRET_KEY

jwt.expiration=86400000
```

---

## 🤖 Supported AI Providers

| Provider                | Status |
| ----------------------- | ------ |
| OpenAI GPT-4o Mini      | ✅      |
| Google Gemini 2.5 Flash | ✅      |

---

## 📌 Current Status

### ✅ Completed

* JWT Authentication
* User Registration/Login
* Multi-user Support
* Conversation Management
* Message Persistence
* Rename Conversation
* Delete Conversation
* File Upload Support
* OpenAI Integration
* Gemini Integration
* Markdown Rendering
* Syntax Highlighting
* Theme Toggle
* Loading Indicator
* Auto Scroll
* Search Conversations
* Like / Dislike Messages
* Toast Notifications

### 🚧 Planned

* Streaming Responses
* Drag & Drop File Upload
* Image Upload Support
* RAG Implementation
* Vector Database Integration
* Docker Deployment
* Role-based Access Control

---

## 👨‍💻 Author

**Mihir Sahu**

Software Engineer | Spring Boot | React | TypeScript
