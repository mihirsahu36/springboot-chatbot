# Spring Boot OpenAI Chatbot

A full-stack AI chatbot application built using Spring Boot, React, TypeScript, and OpenAI APIs.

## Architecture

```text
React Frontend
       │
       ▼
Spring Boot REST API
       │
       ▼
OpenAI API
```

## Project Structure

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

## Features

### Backend
- Spring Boot REST API
- OpenAI Integration
- DTO-based Design
- Maven Build System

### Frontend
- React + TypeScript
- Chat Interface
- API Integration
- Responsive Layout

## Getting Started

### Start Backend

```bash
cd backend
mvn spring-boot:run
```

Backend URL:

```text
http://localhost:8081
```

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

## Current UI

- Dark-themed chatbot interface
- Chat input and response area
- Spring Boot backend integration
- React + TypeScript frontend

## Future Roadmap

- Chat History
- Sidebar Navigation
- Dark/Light Theme Toggle
- Streaming Responses
- Local Storage Persistence
- Docker Deployment

## Author

**Mihir Sahu**  
Software Engineer
