package com.springboot_chatbot.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.springboot_chatbot.Repository.ConversationRepository;
import com.springboot_chatbot.Repository.UploadedFileRepository;
import com.springboot_chatbot.entity.Conversation;
import com.springboot_chatbot.entity.UploadedFile;

@RestController
@RequestMapping("/api/files")
@CrossOrigin("*")
public class FileUploadController {

    private final UploadedFileRepository uploadedFileRepository;
    private final ConversationRepository conversationRepository;

    public FileUploadController(
            UploadedFileRepository uploadedFileRepository,
            ConversationRepository conversationRepository) {

        this.uploadedFileRepository =
                uploadedFileRepository;

        this.conversationRepository =
                conversationRepository;
    }

    @PostMapping("/upload/{conversationId}")
    public String uploadFile(

            @PathVariable
            Long conversationId,

            @RequestParam("file")
            MultipartFile file)

            throws IOException {

        Conversation conversation =
                conversationRepository
                        .findById(conversationId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Conversation not found"));

        UploadedFile uploadedFile =
                new UploadedFile();

        uploadedFile.setFileName(
                file.getOriginalFilename());

        uploadedFile.setContent(
                new String(
                        file.getBytes()));

        uploadedFile.setConversation(
                conversation);

        uploadedFileRepository.save(
                uploadedFile);

        return "File uploaded successfully";
    }

    @GetMapping("/{conversationId}")
    public List<UploadedFile> getFiles(
            @PathVariable Long conversationId) {

        return uploadedFileRepository
                .findByConversationId(
                        conversationId);
    }

    @DeleteMapping("/{fileId}")
    public void deleteFile(
            @PathVariable Long fileId) {

        uploadedFileRepository.deleteById(
                fileId);
    }
}