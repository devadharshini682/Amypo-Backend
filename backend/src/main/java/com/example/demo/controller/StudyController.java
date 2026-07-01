package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.RetentionMetric;
import com.example.demo.entity.StudySession;
import com.example.demo.service.SpacedRepetitionService;
import com.example.demo.service.StudySessionService;

@RestController
@RequestMapping("/api/study")
public class StudyController {

    @Autowired
    private SpacedRepetitionService repetitionService;

    @Autowired
    private StudySessionService sessionService;

    @GetMapping("/due")
    public List<RetentionMetric> getDueReviews(@RequestParam Long userId) {
        return repetitionService.getDueReviews(userId);
    }

    @PostMapping("/complete")
    public StudySession completeSession(@RequestBody StudySession session) {
        return sessionService.completeSession(session);
    }
}