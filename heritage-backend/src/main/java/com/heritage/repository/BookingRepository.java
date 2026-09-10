package com.heritage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.heritage.entity.Booking;


public interface BookingRepository extends JpaRepository<Booking, Long> {

}