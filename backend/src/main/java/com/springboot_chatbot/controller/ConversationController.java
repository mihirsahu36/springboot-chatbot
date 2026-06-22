package com.springboot_chatbot.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.springboot_chatbot.entity.Conversation;
import com.springboot_chatbot.service.ConversationService;

import com.springboot_chatbot.entity.Message;

import com.springboot_chatbot.dto.SendMessageRequest;
import com.springboot_chatbot.service.ChatBotService;

import com.springboot_chatbot.dto.MessageResponse;

import org.springframework.http.ResponseEntity;

import com.springboot_chatbot.dto.RenameConversationRequest;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationService service;
    private final ChatBotService chatBotService;

    public ConversationController(
            ConversationService service,
            ChatBotService chatBotService) {

        this.service = service;
        this.chatBotService = chatBotService;
    }

    @PostMapping
    public Conversation createConversation() {

        return service.createConversation();
    }

    @GetMapping
    public List<Conversation> getConversations() {

        return service.getAllConversations();
    }

    @PostMapping("/{id}/message")
    public String sendMessage(
            @PathVariable Long id,

            @RequestBody
            SendMessageRequest request) {

        return chatBotService
                .getChatResponse(
                        id,
                        request.prompt()
                );
    }

    @GetMapping("/{id}/messages")
    public List<MessageResponse> getMessages(
            @PathVariable Long id) {

        return service.getMessages(id);
    }

    @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteConversation(
                @PathVariable Long id) {

            service.deleteConversation(id);

            return ResponseEntity.noContent().build();
        }

    @PutMapping("/{id}")
    public Conversation renameConversation(
            @PathVariable Long id,

            @RequestBody
            RenameConversationRequest request) {

        return service.renameConversation(
                id,
                request.title());
    }

    @PostMapping("/messages/{id}/like")
    public void likeMessage(
            @PathVariable Long id) {

        chatBotService.likeMessage(id);
    }

    @PostMapping("/messages/{id}/dislike")
    public void dislikeMessage(
            @PathVariable Long id) {

        chatBotService.dislikeMessage(id);
    }
}