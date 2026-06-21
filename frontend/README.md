# Spring Boot Chatbot

A full-stack ChatGPT-style chatbot application built with Spring Boot, React, TypeScript, MySQL, and OpenAI integration.

## 🚀 Tech Stack

### Backend

- Spring Boot
- Spring Data JPA
- MySQL
- OpenAI API
- Maven

### Frontend

- React
- TypeScript
- Vite
- Framer Motion
- React Markdown
- React Syntax Highlighter
- React Icons

---

## ✨ Features

### Chat Features

- Create New Chat
- Persistent Chat History
- Conversation Sidebar
- Rename Conversation
- Delete Conversation
- Auto Scroll to Latest Message
- Loading Indicator
- Typing Animation
- Copy Response Button

### UI Features

- Modern ChatGPT-style Interface
- Dark Mode
- Light Mode Support
- Responsive Layout
- Glassmorphism Effects
- Sidebar Search
- User and Assistant Avatars

### Message Rendering

- Markdown Support
- Syntax Highlighting
- Code Block Rendering
- Inline Code Styling

### Data Persistence

- Conversations stored in MySQL
- Messages stored in MySQL
- Conversation History Retrieval
- Conversation Management

---

## 📁 Project Structure

```text
springboot-chatbot
│
├── backend
│   ├── controller
│   │   └── ConversationController.java
│   │
│   ├── service
│   │   ├── ConversationService.java
│   │   └── ChatBotService.java
│   │
│   ├── repository
│   │   ├── ConversationRepository.java
│   │   └── MessageRepository.java
│   │
│   ├── entity
│   │   ├── Conversation.java
│   │   └── Message.java
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
│   ├── services
│   │   └── conversationApi.ts
│   │
│   ├── types
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
conversations
messages
```

Hibernate configuration:

```properties
spring.jpa.hibernate.ddl-auto=update
```

---

## 📌 Current Status

### ✅ Completed

- Conversation Management
- Message Persistence
- Rename Conversation
- Delete Conversation
- Markdown Rendering
- Syntax Highlighting
- Theme Toggle
- Loading Indicator
- Auto Scroll
- Search Conversations

### 🚧 Planned

- Auto Conversation Title Generation
- Like/Dislike Persistence
- Toast Notifications
- Streaming Responses
- JWT Authentication
- Multi-user Support

---

## 👨‍💻 Author

**Mihir Sahu**

Software Engineer | Spring Boot | React | TypeScript
