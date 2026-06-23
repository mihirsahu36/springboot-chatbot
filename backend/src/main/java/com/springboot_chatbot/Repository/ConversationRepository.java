package com.springboot_chatbot.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.springboot_chatbot.entity.Conversation;
import java.util.List;

public interface ConversationRepository
        extends JpaRepository<Conversation, Long> {
                List<Conversation>
                        findByUser_IdOrderByCreatedAtDesc(
                                Long userId);
}