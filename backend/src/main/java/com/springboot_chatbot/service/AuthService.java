package com.springboot_chatbot.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot_chatbot.Repository.UserRepository;
import com.springboot_chatbot.dto.AuthResponse;
import com.springboot_chatbot.dto.LoginRequest;
import com.springboot_chatbot.dto.RegisterRequest;
import com.springboot_chatbot.entity.User;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(
            RegisterRequest request) {

        if (userRepository.existsByEmail(
                request.email())) {

            throw new RuntimeException(
                    "Email already exists");
        }

        User user = new User();

        user.setUsername(
                request.username());

        user.setEmail(
                request.email());

        user.setPassword(
                passwordEncoder.encode(
                        request.password()));

        userRepository.save(user);

        String token =
                jwtService.generateToken(
                        user.getEmail());

        return new AuthResponse(
                token,
                user.getUsername());
    }

    public AuthResponse login(
            LoginRequest request) {

        User user = userRepository
                .findByEmail(
                        request.email())
                .orElseThrow(
                        () -> new RuntimeException(
                                "Invalid credentials"));

        if (!passwordEncoder.matches(
                request.password(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid credentials");
        }

        String token =
                jwtService.generateToken(
                        user.getEmail());

        return new AuthResponse(
                token,
                user.getUsername());
    }
}