package com.heritage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.heritage.entity.Booking;          // ✅ Correct
import com.heritage.repository.BookingRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository repository;

    public Booking saveBooking(Booking booking) {
        return repository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return repository.findAll();
    }
}