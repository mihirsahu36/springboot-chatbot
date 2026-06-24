# Spring Boot Chatbot

A full-stack AI chatbot application built using **Spring Boot**, **React**, **TypeScript**, **MySQL**, **OpenAI**, and **Google Gemini APIs**.

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

# 🚀 Features

## Backend

* Spring Boot REST API
* Spring Security + JWT Authentication
* User Registration & Login
* Multi-user Support
* OpenAI Integration
* Google Gemini Integration
* Server Sent Events (SSE) Streaming
* MySQL Database Integration
* JPA/Hibernate Persistence
* Conversation Management
* Message Persistence
* File Upload Support
* PDF Text Extraction
* DOCX Text Extraction
* Conversation Ownership Validation
* Rename Conversation API
* Delete Conversation API
* Like / Dislike Message API
* CORS Configuration
* Maven Build System

---

## Frontend

* React + TypeScript
* Modern ChatGPT-style UI
* Authentication UI (Login / Signup)
* Conversation Sidebar
* Create New Chat
* Rename Conversation
* Delete Conversation
* Conversation Search
* AI Provider Selection
* OpenAI / Gemini Switch
* Streaming Responses
* Markdown Rendering
* Syntax Highlighting
* Copy Response Button
* Drag & Drop File Upload
* Multiple File Upload
* File Size Validation
* File Delete Support
* Auto Growing Text Area
* Toast Notifications
* Loading State
* Auto Scroll
* Theme Toggle
* Responsive Layout

---

# 🔐 Authentication APIs

```http
POST /api/auth/register
POST /api/auth/login
```

---

# 💬 Conversation APIs

```http
POST   /api/conversations
GET    /api/conversations
GET    /api/conversations/{id}/messages
POST   /api/conversations/{id}/message
POST   /api/conversations/{id}/stream
PUT    /api/conversations/{id}
DELETE /api/conversations/{id}
```

---

# 👍 Message APIs

```http
POST /api/conversations/messages/{id}/like
POST /api/conversations/messages/{id}/dislike
```

---

# 📁 File APIs

```http
POST   /api/files/upload/{conversationId}
GET    /api/files/{conversationId}
DELETE /api/files/{fileId}
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

Features:

* Persistent Chat History
* User Management
* Conversation Storage
* Message Storage
* Uploaded File Storage
* Automatic Schema Updates

---

# ⚙️ Configuration

## Required Environment Variables

```properties
# OpenAI
openai.api.key=YOUR_OPENAI_API_KEY

# Google Gemini
gemini.api.key=YOUR_GEMINI_API_KEY

# JWT
jwt.secret=YOUR_SECRET_KEY
jwt.expiration=86400000

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/chatbot_db
spring.datasource.username=root
spring.datasource.password=password
```

---

# ⚙️ Getting Started

## Clone Repository

```bash
git clone https://github.com/mihirsahu36/springboot-chatbot.git
```

---

## Start Backend

```bash
cd backend

./mvnw spring-boot:run
```

Backend URL:

```text
http://localhost:8081
```

---

## Start Frontend

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
* MySQL Integration
* OpenAI Integration
* Gemini Integration
* Streaming Responses
* PDF Upload Support
* DOCX Upload Support
* Multiple File Upload
* Drag & Drop Upload
* File Size Validation
* Rename Conversation
* Delete Conversation
* Markdown Rendering
* Syntax Highlighting
* Theme Toggle
* Auto Scroll
* Auto Growing Text Area
* Conversation Search
* Like / Dislike Messages
* Toast Notifications
* Responsive UI

---

# 🎨 UI Features

* Glassmorphism Sidebar
* Conversation History Panel
* User & Assistant Avatars
* Dark Theme Support
* Responsive Layout
* Login / Signup Screens
* Markdown & Code Rendering
* File Upload Interface

---

# 👨‍💻 Author

**Mihir Sahu**

Software Engineer | Spring Boot | React | TypeScript
