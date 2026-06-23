# Spring Boot Chatbot

A full-stack AI chatbot application built using Spring Boot, React, TypeScript, MySQL, OpenAI, and Google Gemini APIs.

## 🏗️ Architecture

```text
React + TypeScript Frontend
            │
            ▼
     Spring Boot REST API
            │
            ▼
 Spring Security + JWT
            │
            ▼
        MySQL Database
            │
            ├───────────────┐
            ▼               ▼
      OpenAI API      Gemini API
```

---

## 📁 Project Structure

```text
springboot-chatbot
│
├── backend
│   ├── src
│   ├── pom.xml
│   └── README.md
│
├── frontend
│   ├── src
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

## 🚀 Features

### Backend

* Spring Boot REST API
* Spring Security
* JWT Authentication
* OpenAI Integration
* Google Gemini Integration
* MySQL Database Integration
* JPA/Hibernate Persistence
* Conversation Management
* Message Persistence
* File Upload Support
* Multi-user Support
* Rename Conversation API
* Delete Conversation API
* Like / Dislike Message API
* CORS Configuration
* Maven Build System

### Frontend

* React + TypeScript
* Modern ChatGPT-style UI
* Login Page
* Conversation Sidebar
* Create New Chat
* Rename Conversation
* Delete Conversation
* Conversation Search
* Markdown Rendering
* Syntax Highlighting
* Copy Response Button
* AI Provider Selection
* File Upload Support
* Toast Notifications
* Loading State
* Auto Scroll
* Theme Toggle
* Responsive Layout

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

## 🗄️ Database

Tables:

```text
users
conversations
messages
uploaded_files
```

Features:

* Persistent Chat History
* Conversation Storage
* Message Storage
* User Management
* File Storage
* Automatic Schema Updates

---

## ⚙️ Configuration

### Required Environment Variables

```properties
openai.api.key=YOUR_OPENAI_API_KEY

gemini.api.key=YOUR_GEMINI_API_KEY

jwt.secret=YOUR_SECRET_KEY

jwt.expiration=86400000
```

---

## ⚙️ Getting Started

### Start Backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend URL:

```text
http://localhost:8081
```

---

### Start Frontend

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
* MySQL Integration
* Rename Conversation
* Delete Conversation
* OpenAI Integration
* Gemini Integration
* File Upload Support
* Markdown Rendering
* Syntax Highlighting
* Theme Toggle
* Auto Scroll
* Loading Indicator
* Conversation Search
* Like / Dislike Messages
* Toast Notifications
* Responsive UI

### 🚧 Planned

* File Content Context for AI Responses
* PDF Text Extraction
* Streaming Responses
* Export Chat as PDF
* Drag & Drop File Upload
* Image Upload Support

---

## 🎨 Current UI

* Modern ChatGPT-inspired Design
* Glassmorphism Sidebar
* Conversation History Panel
* User and Assistant Avatars
* Login Screen
* Dark Theme Support
* Responsive Layout
* Markdown & Code Rendering
* File Upload Interface

---

## 👨‍💻 Author

**Mihir Sahu**

Software Engineer | Spring Boot | React | TypeScript
