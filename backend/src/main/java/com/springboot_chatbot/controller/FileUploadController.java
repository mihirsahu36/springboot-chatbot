package com.springboot_chatbot.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.springboot_chatbot.Repository.ConversationRepository;
import com.springboot_chatbot.Repository.UploadedFileRepository;
import com.springboot_chatbot.entity.Conversation;
import com.springboot_chatbot.entity.UploadedFile;

import org.springframework.security.core.context.SecurityContextHolder;

import com.springboot_chatbot.Repository.UserRepository;
import com.springboot_chatbot.entity.User;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;

@RestController
@RequestMapping("/api/files")
@CrossOrigin("*")
public class FileUploadController {

        private final UploadedFileRepository uploadedFileRepository;
        private final ConversationRepository conversationRepository;
        private final UserRepository userRepository;

        public FileUploadController(
                        UploadedFileRepository uploadedFileRepository,
                        ConversationRepository conversationRepository,
                        UserRepository userRepository) {

                this.uploadedFileRepository = uploadedFileRepository;

                this.conversationRepository = conversationRepository;

                this.userRepository = userRepository;
        }

        @PostMapping("/upload/{conversationId}")
        public String uploadFile(

                        @PathVariable Long conversationId,

                        @RequestParam("file") MultipartFile file)

                        throws IOException {

                Conversation conversation = conversationRepository
                                .findById(conversationId)
                                .orElseThrow(
                                                () -> new RuntimeException(
                                                                "Conversation not found"));

                System.out.println(
                                "Conversation User = " +
                                                conversation.getUser().getEmail());

                System.out.println(
                                "Logged In User = " +
                                                getCurrentUser().getEmail());

                if (file.getSize() > 10 * 1024 * 1024) {

                        throw new RuntimeException(
                                        "File exceeds 10MB");
                }

                if (!conversation.getUser()
                                .getId()
                                .equals(
                                                getCurrentUser().getId())) {

                        throw new RuntimeException(
                                        "Access denied");
                }

                UploadedFile uploadedFile = new UploadedFile();

                uploadedFile.setFileName(
                                file.getOriginalFilename());

                String content;

                String fileName = file.getOriginalFilename()
                                .toLowerCase();

                if (fileName.endsWith(
                                ".pdf")) {

                        content = extractTextFromPdf(
                                        file);
                }

                else if (fileName.endsWith(
                                ".docx")) {

                        content = extractTextFromDocx(
                                        file);
                }

                else {

                        content = new String(
                                        file.getBytes());
                }

                uploadedFile.setContent(content);

                uploadedFile.setConversation(
                                conversation);

                uploadedFileRepository.save(
                                uploadedFile);

                return "File uploaded successfully";
        }

        @GetMapping("/{conversationId}")
        public List<UploadedFile> getFiles(
                        @PathVariable Long conversationId) {

                Conversation conversation = conversationRepository
                                .findById(conversationId)
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

                return uploadedFileRepository
                                .findByConversationId(
                                                conversationId);
        }

        @DeleteMapping("/{fileId}")
        public void deleteFile(
                        @PathVariable Long fileId) {

                UploadedFile file = uploadedFileRepository
                                .findById(fileId)
                                .orElseThrow(
                                                () -> new RuntimeException(
                                                                "File not found"));

                if (!file.getConversation()
                                .getUser()
                                .getId()
                                .equals(
                                                getCurrentUser().getId())) {

                        throw new RuntimeException(
                                        "Access denied");
                }

                uploadedFileRepository.delete(
                                file);
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

        private String extractTextFromPdf(
                        MultipartFile file)
                        throws IOException {

                try (PDDocument document = Loader.loadPDF(
                                file.getBytes())) {

                        PDFTextStripper stripper = new PDFTextStripper();

                        return stripper.getText(document);
                }
        }

        private String extractTextFromDocx(
                        MultipartFile file)
                        throws IOException {

                try (XWPFDocument document = new XWPFDocument(
                                file.getInputStream())) {

                        XWPFWordExtractor extractor = new XWPFWordExtractor(
                                        document);

                        return extractor.getText();

                } catch (Exception e) {

                        System.out.println(
                                        "DOCX parsing failed: "
                                                        + e.getMessage());

                        return "Unable to extract text from this DOCX file. "
                                        + "Please save the document as a standard DOCX "
                                        + "using Microsoft Word and upload again.";
                }
        }
}