package com.springboot_chatbot.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot_chatbot.entity.Message;

public interface MessageRepository
        extends JpaRepository<Message, Long> {

    List<Message> findByConversationIdOrderByTimestampAsc(Long id);
}