package com.example.demo.controller;
import com.example.demo.dto.ProgressResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @GetMapping("/progress")
    public ResponseEntity<ProgressResponseDto> getProgress() {

        ProgressResponseDto response = new ProgressResponseDto();

        response.setTotalCards(0);
        response.setMasteredCards(0);
        response.setProgressPercentage(0.0);

        return ResponseEntity.ok(response);
    }

}
