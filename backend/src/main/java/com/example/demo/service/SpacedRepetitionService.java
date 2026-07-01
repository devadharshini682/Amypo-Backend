package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.RetentionMetric;

public interface SpacedRepetitionService {

    void updateRetentionMetric(Long userId, Long cardId, Integer quality);

    List<RetentionMetric> getDueReviews(Long userId);

}