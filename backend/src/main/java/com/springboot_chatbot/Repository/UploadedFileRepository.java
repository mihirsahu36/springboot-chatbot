package com.springboot_chatbot.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot_chatbot.entity.UploadedFile;

public interface UploadedFileRepository
        extends JpaRepository<UploadedFile, Long> {

    List<UploadedFile>
    findByConversationId(Long conversationId);

    void deleteByConversation_Id(Long conversationId);
}