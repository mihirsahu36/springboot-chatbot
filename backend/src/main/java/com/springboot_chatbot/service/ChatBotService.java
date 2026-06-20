package com.springboot_chatbot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.springboot_chatbot.dto.ChatBotRequest;
import com.springboot_chatbot.dto.ChatBotResponse;
import com.springboot_chatbot.dto.PromptRequest;

@Service
public class ChatBotService {

    private final RestClient restClient;

    public ChatBotService(RestClient restClient)
    {
        this.restClient = restClient;
    }

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openapi.api.model}")
    private String model;

    public String getChatResponse(PromptRequest promptRequest)
    {
        try
        {
            ChatBotRequest chatBotRequest = new ChatBotRequest(
                    model,
                    List.of(new ChatBotRequest.Message("user", promptRequest.prompt()))
            );

            System.out.println("Calling OpenAI...");

            ChatBotResponse response = restClient.post()
                    .header("Authorization", "Bearer " + apiKey)
                    .body(chatBotRequest)
                    .retrieve()
                    .body(ChatBotResponse.class);

            if (response == null ||
                    response.choices() == null ||
                    response.choices().isEmpty())
            {
                return "No response received from OpenAI";
            }

            return response.choices().get(0).message().content();
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return "Error calling OpenAI API : " + e.getMessage();
        }
    }
}
