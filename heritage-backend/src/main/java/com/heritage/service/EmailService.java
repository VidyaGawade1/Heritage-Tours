package com.heritage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendBookingEmail(
            String toEmail,
            String name,
            String phone,
            String destination) {

        // Customer Email
        SimpleMailMessage customerMessage = new SimpleMailMessage();

        customerMessage.setTo(toEmail);
        customerMessage.setSubject("Booking Confirmation - Heritage Maharashtra");

        customerMessage.setText(
                "Dear " + name + ",\n\n" +
                "Thank you for booking your journey with Heritage Maharashtra.\n\n" +
                "We have successfully received your booking request.\n\n" +
                "Booking Details:\n" +
                "--------------------------------\n" +
                "Name: " + name + "\n" +
                "Email: " + toEmail + "\n" +
                "Phone: " + phone + "\n" +
                "Destination: " + destination + "\n" +
                "--------------------------------\n\n" +
                "Our team will contact you shortly.\n\n" +
                "Best Regards,\n" +
                "Heritage Maharashtra Team"
        );

        mailSender.send(customerMessage);

        // Admin Email
        SimpleMailMessage adminMessage = new SimpleMailMessage();

        adminMessage.setTo("gvidya853@gmail.com");
        adminMessage.setSubject("New Booking Received");

        adminMessage.setText(
                "New Booking Received\n\n" +
                "Name: " + name + "\n" +
                "Email: " + toEmail + "\n" +
                "Phone: " + phone + "\n" +
                "Destination: " + destination
        );

        mailSender.send(adminMessage);
    }
}