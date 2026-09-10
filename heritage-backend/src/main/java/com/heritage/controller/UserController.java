package com.heritage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.heritage.entity.User;
import com.heritage.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    /*
    ==========================================
    REGISTER USER
    ==========================================
    */

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody User user
    ) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {

            return ResponseEntity
                    .badRequest()
                    .body("Email already registered");

        }

        User savedUser =
                userRepository.save(user);

        /*
        Do not return password
        */

        savedUser.setPassword(null);

        return ResponseEntity.ok(savedUser);
    }


    /*
    ==========================================
    LOGIN
    ==========================================
    */

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody User loginUser
    ) {

        User user =
                userRepository
                        .findByEmail(loginUser.getEmail())
                        .orElse(null);

        if (user == null) {

            return ResponseEntity
                    .status(401)
                    .body("User not found");

        }

        if (!user.getPassword()
                .equals(loginUser.getPassword())) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid password");

        }

        /*
        Don't send password to React
        */

        user.setPassword(null);

        return ResponseEntity.ok(user);
    }


    /*
    ==========================================
    GET USER BY ID
    ==========================================
    */

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(
            @PathVariable Long id
    ) {

        return userRepository
                .findById(id)
                .map(user -> {

                    user.setPassword(null);

                    return ResponseEntity.ok(user);

                })
                .orElse(
                    ResponseEntity.notFound().build()
                );
    }


    /*
    ==========================================
    GET ALL USERS
    ==========================================
    */

    @GetMapping
    public List<User> getAllUsers() {

        List<User> users = userRepository.findAll();

        users.forEach(user -> user.setPassword(null));

        return users;
    }

}