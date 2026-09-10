package com.heritage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.heritage.entity.Booking;
import com.heritage.repository.BookingRepository;
import com.heritage.service.EmailService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EmailService emailService;

    // SAVE BOOKING
    @PostMapping
    public Booking saveBooking(@RequestBody Booking booking) {

        Booking savedBooking = bookingRepository.save(booking);

        emailService.sendBookingEmail(
                savedBooking.getEmail(),
                savedBooking.getFullName(),
                savedBooking.getPhone(),
                savedBooking.getDestination()
        );

        return savedBooking;
    }

    // GET ALL BOOKINGS
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // GET BOOKING BY ID
    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    // DELETE BOOKING
    @DeleteMapping("/{id}")
    public String deleteBooking(@PathVariable Long id) {
        bookingRepository.deleteById(id);
        return "Booking deleted successfully";
    }
}