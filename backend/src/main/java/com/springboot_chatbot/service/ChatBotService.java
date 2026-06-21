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

@Service
public class ChatBotService {

    private final RestClient restClient;

    private final ConversationRepository conversationRepository;

    private final MessageRepository messageRepository;

    public ChatBotService(
            RestClient restClient,
            ConversationRepository conversationRepository,
            MessageRepository messageRepository)
    {
        this.restClient = restClient;
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
    }

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openapi.api.model}")
    private String model;

    /*
    * Existing API
    * Keep this until frontend migration is completed
    */
    public String getChatResponse(
            PromptRequest promptRequest)
    {
        try
        {
            ChatBotRequest chatBotRequest =
                    new ChatBotRequest(
                            model,
                            List.of(
                                    new ChatBotRequest.Message(
                                            "user",
                                            promptRequest.prompt()
                                    )
                            )
                    );

            ChatBotResponse response =
                    restClient.post()
                            .header(
                                    "Authorization",
                                    "Bearer " + apiKey)
                            .body(chatBotRequest)
                            .retrieve()
                            .body(ChatBotResponse.class);

            if (response == null ||
                    response.choices() == null ||
                    response.choices().isEmpty())
            {
                return "No response received from OpenAI";
            }

            return response
                    .choices()
                    .get(0)
                    .message()
                    .content();
        }
        catch (Exception e)
        {
            e.printStackTrace();

            return "Error calling OpenAI API : "
                    + e.getMessage();
        }
    }

    /*
    * New Persistent Chat API
    */
    public String getChatResponse(
            Long conversationId,
            String prompt)
    {
        try
        {
            Conversation conversation =
                    conversationRepository
                            .findById(conversationId)
                            .orElseThrow(
                                    () -> new RuntimeException(
                                            "Conversation not found"));

            if ("New Chat".equals(conversation.getTitle())) {
                String title =
                        prompt.length() > 30
                                ? prompt.substring(0, 30)
                                : prompt;

                conversation.setTitle(title);

                conversationRepository.save(
                        conversation
                );
            }

            Message userMessage =
                    new Message();

            userMessage.setRole(
                    "user");

            userMessage.setContent(
                    prompt);

            userMessage.setConversation(
                    conversation);

            messageRepository.save(
                    userMessage);

            List<Message> history =
                    messageRepository
                            .findByConversationIdOrderByTimestampAsc(
                                    conversationId);

            List<ChatBotRequest.Message> openAiMessages =
                    history.stream()
                            .map(message ->
                                    new ChatBotRequest.Message(
                                            message.getRole(),
                                            message.getContent()))
                            .collect(Collectors.toList());

            ChatBotRequest request =
                    new ChatBotRequest(
                            model,
                            openAiMessages);

            ChatBotResponse response =
                    restClient.post()
                            .header(
                                    "Authorization",
                                    "Bearer " + apiKey)
                            .body(request)
                            .retrieve()
                            .body(ChatBotResponse.class);

            if (response == null ||
                    response.choices() == null ||
                    response.choices().isEmpty())
            {
                return "No response received from OpenAI";
            }

            String aiResponse =
                    response
                            .choices()
                            .get(0)
                            .message()
                            .content();

            Message assistantMessage =
                    new Message();

            assistantMessage.setRole(
                    "assistant");

            assistantMessage.setContent(
                    aiResponse);

            assistantMessage.setConversation(
                    conversation);

            messageRepository.save(
                    assistantMessage);

            return aiResponse;
        }
        catch (Exception e)
        {
            e.printStackTrace();

            return "Error calling OpenAI API : "
                    + e.getMessage();
        }
    }
}
