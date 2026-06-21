package com.springboot_chatbot.dto;

import java.time.LocalDateTime;

public record MessageResponse(
        Long id,
        String role,
        String content,
        LocalDateTime timestamp
) {
}