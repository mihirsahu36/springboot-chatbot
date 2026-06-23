package com.springboot_chatbot.dto;

public record PromptRequest(
        @NotBlank(message = "Prompt cannot be empty")
        String prompt,
        String provider
) {
}
