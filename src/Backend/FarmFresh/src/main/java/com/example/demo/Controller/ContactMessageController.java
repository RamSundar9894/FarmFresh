package com.example.demo.Controller;

import com.example.demo.Model.ContactMessage;
import com.example.demo.Service.ContactMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactMessageController {

    @Autowired
    private ContactMessageService contactMessageService;

    @PostMapping
    public ResponseEntity<String> submitContactMessage(@RequestBody ContactMessage contactMessage) {
        String validationError = validateContactMessage(contactMessage);
        if (validationError != null) {
            return new ResponseEntity<>(validationError, HttpStatus.BAD_REQUEST);
        }

        contactMessageService.saveContactMessage(contactMessage);
        return new ResponseEntity<>("Message sent successfully!", HttpStatus.CREATED);
    }

    private String validateContactMessage(ContactMessage contactMessage) {
        if (contactMessage.getName() == null || contactMessage.getName().trim().isEmpty()) {
            return "Name is required";
        }
        if (contactMessage.getEmail() == null || contactMessage.getEmail().trim().isEmpty()) {
            return "Email is required";
        }
        if (!contactMessage.getEmail().matches("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            return "Invalid email address";
        }
        if (contactMessage.getMessage() == null || contactMessage.getMessage().trim().isEmpty()) {
            return "Message is required";
        }
        return null;
    }
}
