package com.springboot_chatbot.dto;

public record AuthResponse(
        String token,
        String username) {
}