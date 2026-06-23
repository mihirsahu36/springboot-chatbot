package com.springboot_chatbot.dto;

public record RegisterRequest(
        String username,
        String email,
        String password) {
}