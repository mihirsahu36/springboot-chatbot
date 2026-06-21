package com.springboot_chatbot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot_chatbot.Repository.ConversationRepository;
import com.springboot_chatbot.entity.Conversation;

import com.springboot_chatbot.Repository.MessageRepository;
import com.springboot_chatbot.dto.MessageResponse;
import com.springboot_chatbot.entity.Message;

@Service
public class ConversationService {

    private final ConversationRepository repository;
    private final MessageRepository messageRepository;

    public ConversationService(
            ConversationRepository repository,
            MessageRepository messageRepository) {

        this.repository = repository;
        this.messageRepository = messageRepository;
    }

    public Conversation createConversation() {

        Conversation conversation =
                new Conversation();

        conversation.setTitle("New Chat");

        return repository.save(conversation);
    }

    public List<Conversation> getAllConversations() {

        return repository.findAll();
    }

    public List<MessageResponse> getMessages(Long conversationId) {

        return messageRepository
                .findByConversationIdOrderByTimestampAsc(conversationId)
                .stream()
                .map(message -> new MessageResponse(
                        message.getId(),
                        message.getRole(),
                        message.getContent(),
                        message.getTimestamp()
                ))
                .toList();
    }

    public void deleteConversation(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException(
                "Conversation not found"
            );
        }

        repository.deleteById(id);
    }

    public Conversation renameConversation(
            Long id,
            String title) {

        Conversation conversation =
                repository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Conversation not found"));

        conversation.setTitle(title);

        return repository.save(conversation);
    }
}