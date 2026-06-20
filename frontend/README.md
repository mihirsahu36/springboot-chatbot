# React Chatbot Frontend

A React + TypeScript frontend for interacting with the Spring Boot chatbot backend.

## Tech Stack

- React
- TypeScript
- Vite

## Current Features

- Chat interface
- User message input
- Send message button
- Display chatbot responses
- Integration with Spring Boot backend

## Project Structure

```text
frontend
├── public
├── src
│   ├── components
│   │   ├── ChatInput.tsx
│   │   ├── ChatWindow.tsx
│   │   └── Message.tsx
│   │
│   ├── services
│   │   └── ChatApi.ts
│   │
│   ├── types
│   │   └── Chat.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
│
├── package.json
└── vite.config.ts
```

## Run Application

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Application URL

```text
http://localhost:5173
```

## Backend Connection

The frontend sends requests to:

```text
http://localhost:8081/api/chat
```
