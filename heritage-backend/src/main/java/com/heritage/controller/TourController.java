package com.heritage.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.heritage.entity.Tour;
import com.heritage.repository.TourRepository;

@RestController
@RequestMapping("/api/tours")
@CrossOrigin(origins = "http://localhost:5173")
public class TourController {

    @Autowired
    private TourRepository tourRepository;

    // GET ALL TOURS
    @GetMapping
    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }
 // UPDATE TOUR
    @PutMapping("/{id}")
    public Tour updateTour(
            @PathVariable Long id,
            @RequestBody Tour updatedTour
    ) {

        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found"));

        tour.setName(updatedTour.getName());
        tour.setLocation(updatedTour.getLocation());
        tour.setCategory(updatedTour.getCategory());
        tour.setPrice(updatedTour.getPrice());
        tour.setDuration(updatedTour.getDuration());
        tour.setDescription(updatedTour.getDescription());

        return tourRepository.save(tour);
    }

    // ADD TOUR
    @PostMapping
    public Tour addTour(
            @RequestParam String name,
            @RequestParam String location,
            @RequestParam String category,
            @RequestParam Double price,
            @RequestParam String duration,
            @RequestParam String description,
            @RequestParam("image") MultipartFile image
    ) throws IOException {

        // Create uploads folder
        Path uploadPath = Paths.get("uploads");

        System.out.println("Upload Folder = " + uploadPath.toAbsolutePath());

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = image.getOriginalFilename();

        if (fileName != null && !fileName.isEmpty()) {

            Path filePath = uploadPath.resolve(fileName);

            System.out.println("Saving File = " + filePath.toAbsolutePath());

            Files.copy(
                    image.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            System.out.println("Saved Image = " + filePath.toAbsolutePath());
        }

        Tour tour = new Tour();
        tour.setName(name);
        tour.setLocation(location);
        tour.setCategory(category);
        tour.setPrice(price);
        tour.setDuration(duration);
        tour.setDescription(description);
        tour.setImage(fileName);

        return tourRepository.save(tour);
    }

    // DELETE TOUR
    @DeleteMapping("/{id}")
    public String deleteTour(@PathVariable Long id) {
        tourRepository.deleteById(id);
        return "Tour deleted successfully";
    }
}