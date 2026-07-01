package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.RetentionMetric;
import com.example.demo.repository.RetentionMetricRepository;

@Service
public class SpacedRepetitionServiceImpl implements SpacedRepetitionService {

    @Autowired
    private RetentionMetricRepository retentionMetricRepository;

    @Override
    public void updateRetentionMetric(Long userId, Long cardId, Integer quality) {
        // Placeholder implementation
    }

    @Override
    public List<RetentionMetric> getDueReviews(Long userId) {
        return retentionMetricRepository.findByNextReviewDateBefore(LocalDateTime.now());
    }
}