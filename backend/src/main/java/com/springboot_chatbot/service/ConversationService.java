package com.springboot_chatbot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot_chatbot.Repository.ConversationRepository;
import com.springboot_chatbot.entity.Conversation;

import com.springboot_chatbot.Repository.MessageRepository;
import com.springboot_chatbot.dto.MessageResponse;
import com.springboot_chatbot.entity.Message;
import com.springboot_chatbot.Repository.UploadedFileRepository;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.security.core.context.SecurityContextHolder;
import com.springboot_chatbot.Repository.UserRepository;
import com.springboot_chatbot.entity.User;

@Service
public class ConversationService {

        private final ConversationRepository repository;
        private final MessageRepository messageRepository;
        private final UploadedFileRepository uploadedFileRepository;
        private final UserRepository userRepository;

        public ConversationService(
                        ConversationRepository repository,
                        MessageRepository messageRepository,
                        UploadedFileRepository uploadedFileRepository,
                        UserRepository userRepository) {

                this.repository = repository;
                this.messageRepository = messageRepository;
                this.uploadedFileRepository = uploadedFileRepository;
                this.userRepository = userRepository;
        }

        public Conversation createConversation() {
                User user = getCurrentUser();

                Conversation conversation = new Conversation();

                conversation.setTitle("New Chat");

                conversation.setUser(user);

                return repository.save(conversation);
        }

        public List<Conversation> getAllConversations() {

                return repository
                                .findByUser_IdOrderByCreatedAtDesc(
                                                getCurrentUser().getId());
        }

        public List<MessageResponse> getMessages(Long conversationId) {
                Conversation conversation = repository.findById(
                                conversationId)
                                .orElseThrow(() -> new RuntimeException(
                                                "Conversation not found"));

                if (!conversation.getUser()
                                .getId()
                                .equals(
                                                getCurrentUser().getId())) {

                        throw new RuntimeException(
                                        "Access denied");
                }

                return messageRepository
                                .findByConversationIdOrderByTimestampAsc(conversationId)
                                .stream()
                                .map(message -> new MessageResponse(
                                                message.getId(),
                                                message.getRole(),
                                                message.getContent(),
                                                message.getTimestamp()))
                                .toList();
        }

        @Transactional
        public void deleteConversation(Long id) {
                Conversation conversation = repository.findById(id)
                                .orElseThrow(() -> new RuntimeException(
                                                "Conversation not found"));

                if (!conversation.getUser()
                                .getId()
                                .equals(
                                                getCurrentUser().getId())) {

                        throw new RuntimeException(
                                        "Access denied");
                }
                if (!repository.existsById(id)) {
                        throw new RuntimeException(
                                        "Conversation not found");
                }

                uploadedFileRepository
                                .deleteByConversation_Id(id);

                repository.deleteById(id);
        }

        public Conversation renameConversation(
                        Long id,
                        String title) {
                Conversation conversation = repository.findById(id)
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

                conversation.setTitle(title);

                return repository.save(conversation);
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
}