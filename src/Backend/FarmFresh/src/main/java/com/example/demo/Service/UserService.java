package com.example.demo.Service;

import com.example.demo.Model.User;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String signup(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already exists!";
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already exists!";
        }
        // Set a default role if not provided
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("user"); // Default role
        }
        userRepository.save(user);
        return "User registered successfully!";
    }

    public String login(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            return "User not found!";
        }
        User user = userOpt.get();
        if (password.equals(user.getPassword())) { // Plain text password check
            return "Login successful!";
        }
        return "Invalid password!";
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUserDetails(Long userId, User userDetails) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail());
            user.setRole(userDetails.getRole());
            // Optionally, update the password if it's provided
            if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
                user.setPassword(userDetails.getPassword());
            }
            return userRepository.save(user);
        }
        return null;
    }
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

}
