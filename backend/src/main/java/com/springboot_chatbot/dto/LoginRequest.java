package com.springboot_chatbot.dto;

public record LoginRequest(
        String email,
        String password) {
}