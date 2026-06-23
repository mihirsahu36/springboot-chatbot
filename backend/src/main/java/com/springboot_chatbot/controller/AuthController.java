package com.springboot_chatbot.controller;

import org.springframework.web.bind.annotation.*;

import com.springboot_chatbot.dto.AuthResponse;
import com.springboot_chatbot.dto.LoginRequest;
import com.springboot_chatbot.dto.RegisterRequest;
import com.springboot_chatbot.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService) {

        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(
            @RequestBody RegisterRequest request) {

        return authService.register(
                request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request) {

        return authService.login(
                request);
    }
}