package com.springboot_chatbot.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.springboot_chatbot.entity.Conversation;

public interface ConversationRepository
        extends JpaRepository<Conversation, Long> {
}