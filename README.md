# Spring Boot Chatbot

A full-stack AI chatbot application built using Spring Boot, React, TypeScript, and OpenAI APIs.

## 🏗️ Architecture

```text
React + TypeScript Frontend
            │
            ▼
     Spring Boot REST API
            │
            ▼
        MySQL Database
            │
            ▼
        OpenAI API
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

- Spring Boot REST API
- OpenAI Integration
- MySQL Database Integration
- JPA/Hibernate Persistence
- Conversation Management
- Message Persistence
- Rename Conversation API
- Delete Conversation API
- CORS Configuration
- Maven Build System

### Frontend

- React + TypeScript
- Modern ChatGPT-style UI
- Conversation Sidebar
- Create New Chat
- Rename Conversation
- Delete Conversation
- Conversation Search
- Markdown Rendering
- Syntax Highlighting
- Copy Response Button
- Typing Indicator
- Loading State
- Auto Scroll
- Theme Toggle
- Responsive Layout

---

## 🔗 Backend APIs

### Create Conversation

```http
POST /api/conversations
```

### Get All Conversations

```http
GET /api/conversations
```

### Get Messages

```http
GET /api/conversations/{id}/messages
```

### Send Message

```http
POST /api/conversations/{id}/message
```

### Rename Conversation

```http
PUT /api/conversations/{id}
```

### Delete Conversation

```http
DELETE /api/conversations/{id}
```

---

## 🗄️ Database

Tables:

```text
conversations
messages
```

Features:

- Persistent Chat History
- Conversation Storage
- Message Storage
- Automatic Schema Updates

---

## ⚙️ Getting Started

### Start Backend

```bash
cd backend
mvn spring-boot:run
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

## 📌 Current Status

### ✅ Completed

- Conversation Management
- Message Persistence
- MySQL Integration
- Rename Conversation
- Delete Conversation
- Markdown Rendering
- Syntax Highlighting
- Theme Toggle
- Auto Scroll
- Loading Indicator
- Typing Animation
- Conversation Search
- Responsive UI

### 🚧 Planned

- Auto Conversation Title Generation
- Like / Dislike Persistence
- Toast Notifications
- Streaming Responses
- JWT Authentication
- Multi-user Support
- Docker Deployment

---

## 🎨 Current UI

- Modern ChatGPT-inspired Design
- Glassmorphism Sidebar
- Conversation History Panel
- User and Assistant Avatars
- Dark Theme Support
- Responsive Layout
- Markdown & Code Rendering

---

## 👨‍💻 Author

**Mihir Sahu**

Software Engineer | Spring Boot | React | TypeScript
