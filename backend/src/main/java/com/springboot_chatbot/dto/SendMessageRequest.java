package com.springboot_chatbot.dto;

public record SendMessageRequest(
        String prompt,
        String provider
) {
}