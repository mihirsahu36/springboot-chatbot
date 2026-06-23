package com.springboot_chatbot.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.springboot_chatbot.Repository.ConversationRepository;
import com.springboot_chatbot.Repository.MessageRepository;
import com.springboot_chatbot.dto.ChatBotRequest;
import com.springboot_chatbot.dto.ChatBotResponse;
import com.springboot_chatbot.dto.PromptRequest;
import com.springboot_chatbot.entity.Conversation;
import com.springboot_chatbot.entity.Message;

import com.springboot_chatbot.dto.GeminiRequest;
import com.springboot_chatbot.dto.GeminiResponse;

import org.springframework.security.core.context.SecurityContextHolder;

import com.springboot_chatbot.Repository.UserRepository;
import com.springboot_chatbot.entity.User;

@Service
public class ChatBotService {

        private final RestClient restClient;

        private final ConversationRepository conversationRepository;

        private final MessageRepository messageRepository;

        private final UserRepository userRepository;

        public ChatBotService(
                        RestClient restClient,
                        ConversationRepository conversationRepository,
                        MessageRepository messageRepository,
                        UserRepository userRepository) {

                this.restClient = restClient;
                this.conversationRepository = conversationRepository;

                this.messageRepository = messageRepository;

                this.userRepository = userRepository;
        }

        @Value("${openai.api.key}")
        private String apiKey;

        @Value("${openapi.api.model}")
        private String model;

        @Value("${gemini.api.key}")
        private String geminiApiKey;

        @Value("${gemini.api.model}")
        private String geminiModel;

        private void updateConversationTitle(
                        Conversation conversation,
                        String prompt) {

                if ("New Chat".equals(conversation.getTitle())) {

                        String title = prompt.length() > 30
                                        ? prompt.substring(0, 30) + "..."
                                        : prompt;

                        conversation.setTitle(title);

                        conversationRepository.save(conversation);
                }
        }

        private User getCurrentUser() {
                String email = SecurityContextHolder
                                .getContext()
                                .getAuthentication()
                                .getName();

                return userRepository
                                .findByEmail(email)
                                .orElseThrow(
                                                () -> new RuntimeException(
                                                                "User not found"));
        }

        /*
         * Existing API
         * Keep this until frontend migration is completed
         */
        public String getChatResponse(
                        PromptRequest promptRequest) {
                try {
                        ChatBotRequest chatBotRequest = new ChatBotRequest(
                                        model,
                                        List.of(
                                                        new ChatBotRequest.Message(
                                                                        "user",
                                                                        promptRequest.prompt())));

                        ChatBotResponse response = restClient.post()
                                        .header(
                                                        "Authorization",
                                                        "Bearer " + apiKey)
                                        .body(chatBotRequest)
                                        .retrieve()
                                        .body(ChatBotResponse.class);

                        if (response == null ||
                                        response.choices() == null ||
                                        response.choices().isEmpty()) {
                                return "No response received from OpenAI";
                        }

                        return response
                                        .choices()
                                        .get(0)
                                        .message()
                                        .content();
                } catch (Exception e) {
                        e.printStackTrace();

                        return "Error calling OpenAI API : "
                                        + e.getMessage();
                }
        }

        /*
         * New Persistent Chat API
         */
        private String getOpenAiResponse(
                        Long conversationId,
                        String prompt) {
                try {
                        Conversation conversation = conversationRepository
                                        .findById(conversationId)
                                        .orElseThrow(
                                                        () -> new RuntimeException(
                                                                        "Conversation not found"));

                        if (!conversation.getUser()
                                        .getId()
                                        .equals(
                                                        getCurrentUser().getId())) {

                                throw new RuntimeException(
                                                "Access denied");
                        }

                        updateConversationTitle(conversation, prompt);

                        Message userMessage = new Message();

                        userMessage.setRole(
                                        "user");

                        userMessage.setContent(
                                        prompt);

                        userMessage.setConversation(
                                        conversation);

                        messageRepository.save(
                                        userMessage);

                        List<Message> history = messageRepository
                                        .findByConversationIdOrderByTimestampAsc(
                                                        conversationId);

                        List<ChatBotRequest.Message> openAiMessages = history.stream()
                                        .map(message -> new ChatBotRequest.Message(
                                                        message.getRole(),
                                                        message.getContent()))
                                        .collect(Collectors.toList());

                        ChatBotRequest request = new ChatBotRequest(
                                        model,
                                        openAiMessages);

                        ChatBotResponse response = restClient.post()
                                        .header(
                                                        "Authorization",
                                                        "Bearer " + apiKey)
                                        .body(request)
                                        .retrieve()
                                        .body(ChatBotResponse.class);

                        if (response == null ||
                                        response.choices() == null ||
                                        response.choices().isEmpty()) {
                                return "No response received from OpenAI";
                        }

                        String aiResponse = response
                                        .choices()
                                        .get(0)
                                        .message()
                                        .content();

                        Message assistantMessage = new Message();

                        assistantMessage.setRole(
                                        "assistant");

                        assistantMessage.setContent(
                                        aiResponse);

                        assistantMessage.setConversation(
                                        conversation);

                        messageRepository.save(
                                        assistantMessage);

                        return aiResponse;
                } catch (Exception e) {
                        e.printStackTrace();

                        String friendlyMessage = """
                                        ⚠️ AI service is currently unavailable.

                                        OpenAI API quota has been exceeded.

                                        You can continue testing the application UI,
                                        conversation history, rename, delete and
                                        other features until API credits are added.
                                        """;

                        Conversation conversation = conversationRepository
                                        .findById(conversationId)
                                        .orElseThrow(
                                                        () -> new RuntimeException(
                                                                        "Conversation not found"));

                        Message assistantMessage = new Message();

                        assistantMessage.setRole(
                                        "assistant");

                        assistantMessage.setContent(
                                        friendlyMessage);

                        assistantMessage.setConversation(
                                        conversation);

                        messageRepository.save(
                                        assistantMessage);

                        return friendlyMessage;
                }
        }

        public String getChatResponse(
                        Long conversationId,
                        String prompt,
                        String provider) {

                if ("gemini".equalsIgnoreCase(provider)) {

                        return getGeminiResponse(
                                        conversationId,
                                        prompt);
                }

                return getOpenAiResponse(
                                conversationId,
                                prompt);
        }

        private String getGeminiResponse(
                        Long conversationId,
                        String prompt) {
                try {

                        Conversation conversation = conversationRepository
                                        .findById(conversationId)
                                        .orElseThrow(
                                                        () -> new RuntimeException(
                                                                        "Conversation not found"));

                        if (!conversation.getUser()
                                        .getId()
                                        .equals(
                                                        getCurrentUser().getId())) {

                                throw new RuntimeException(
                                                "Access denied");
                        }

                        updateConversationTitle(conversation, prompt);

                        Message userMessage = new Message();

                        userMessage.setRole("user");
                        userMessage.setContent(prompt);
                        userMessage.setConversation(conversation);

                        messageRepository.save(userMessage);

                        List<Message> history = messageRepository
                                        .findByConversationIdOrderByTimestampAsc(
                                                        conversationId);

                        List<GeminiRequest.Content> contents = history.stream()
                                        .map(message -> {

                                                String role = "assistant".equals(
                                                                message.getRole())
                                                                                ? "model"
                                                                                : "user";

                                                return new GeminiRequest.Content(
                                                                role,
                                                                List.of(
                                                                                new GeminiRequest.Part(
                                                                                                message.getContent())));
                                        })
                                        .toList();

                        GeminiRequest request = new GeminiRequest(contents);

                        GeminiResponse response = RestClient.create()
                                        .post()
                                        .uri(
                                                        "https://generativelanguage.googleapis.com/v1beta/models/"
                                                                        + geminiModel
                                                                        + ":generateContent?key="
                                                                        + geminiApiKey)
                                        .body(request)
                                        .retrieve()
                                        .body(GeminiResponse.class);

                        String aiResponse = response.candidates()
                                        .get(0)
                                        .content()
                                        .parts()
                                        .get(0)
                                        .text();

                        Message assistantMessage = new Message();

                        assistantMessage.setRole(
                                        "assistant");

                        assistantMessage.setContent(
                                        aiResponse);

                        assistantMessage.setConversation(
                                        conversation);

                        messageRepository.save(
                                        assistantMessage);

                        return aiResponse;

                } catch (Exception e) {

                        e.printStackTrace();

                        return "Error calling Gemini API : "
                                        + e.getMessage();
                }
        }

        public void likeMessage(Long id) {
                Message message = messageRepository
                                .findById(id)
                                .orElseThrow(
                                                () -> new RuntimeException(
                                                                "Message not found"));

                message.setLiked(true);
                message.setDisliked(false);

                messageRepository.save(message);
        }

        public void dislikeMessage(Long id) {
                Message message = messageRepository
                                .findById(id)
                                .orElseThrow(
                                                () -> new RuntimeException(
                                                                "Message not found"));

                message.setLiked(false);
                message.setDisliked(true);

                messageRepository.save(message);
        }
}
