package com.heritage.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.heritage.entity.Tour;
import com.heritage.repository.TourRepository;

@RestController
@RequestMapping("/api/tours")
public class TourController {

    private static final Path UPLOAD_PATH = Paths.get("uploads");

    @Autowired
    private TourRepository tourRepository;

    // GET ALL TOURS
    @GetMapping
    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }
 // UPDATE TOUR
    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Tour updateTour(
            @PathVariable Long id,
            @RequestBody Tour updatedTour
    ) {

        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found"));

        applyTourFields(
                tour,
                updatedTour.getName(),
                updatedTour.getLocation(),
                updatedTour.getCategory(),
                updatedTour.getPrice(),
                updatedTour.getDuration(),
                updatedTour.getDescription()
        );
        tour.setImage(updatedTour.getImage());

        return tourRepository.save(tour);
    }

    @PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Tour updateTourWithImage(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("location") String location,
            @RequestParam("category") String category,
            @RequestParam("price") Double price,
            @RequestParam("duration") String duration,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) throws IOException {

        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found"));

        applyTourFields(tour, name, location, category, price, duration, description);

        String fileName = saveImage(image);
        if (fileName != null) {
            tour.setImage(fileName);
        }

        return tourRepository.save(tour);
    }

    // ADD TOUR
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Tour addTour(
            @RequestParam("name") String name,
            @RequestParam("location") String location,
            @RequestParam("category") String category,
            @RequestParam("price") Double price,
            @RequestParam("duration") String duration,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) throws IOException {

        Tour tour = new Tour();
        applyTourFields(tour, name, location, category, price, duration, description);

        String fileName = saveImage(image);
        tour.setImage(fileName);

        return tourRepository.save(tour);
    }

    // DELETE TOUR
    @DeleteMapping("/{id}")
    public String deleteTour(@PathVariable Long id) {
        tourRepository.deleteById(id);
        return "Tour deleted successfully";
    }

    private void applyTourFields(
            Tour tour,
            String name,
            String location,
            String category,
            Double price,
            String duration,
            String description
    ) {
        tour.setName(name);
        tour.setLocation(location);
        tour.setCategory(category);
        tour.setPrice(price);
        tour.setDuration(duration);
        tour.setDescription(description);
    }

    private String saveImage(MultipartFile image) throws IOException {
        if (image == null || image.isEmpty()) {
            return null;
        }

        Path uploadDirectory = UPLOAD_PATH.toAbsolutePath().normalize();
        Files.createDirectories(uploadDirectory);

        String cleanedFileName = StringUtils.cleanPath(
                StringUtils.hasText(image.getOriginalFilename()) ? image.getOriginalFilename() : "tour-image"
        );
        cleanedFileName = cleanedFileName.replace("\\", "/");

        int lastSlashIndex = cleanedFileName.lastIndexOf("/");
        String originalFileName = lastSlashIndex >= 0
                ? cleanedFileName.substring(lastSlashIndex + 1)
                : cleanedFileName;
        originalFileName = originalFileName.replaceAll("[^A-Za-z0-9._-]", "_");

        if (!StringUtils.hasText(originalFileName) || ".".equals(originalFileName) || "..".equals(originalFileName)) {
            originalFileName = "tour-image";
        }

        String fileName = UUID.randomUUID() + "-" + originalFileName;
        Path filePath = uploadDirectory.resolve(fileName).normalize();

        if (!filePath.startsWith(uploadDirectory)) {
            throw new IOException("Invalid image filename");
        }

        Files.copy(
                image.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING
        );

        return fileName;
    }
}
