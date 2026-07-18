package com.example.demo.service;
import com.example.demo.entity.RetentionMetric;

import java.util.List;

public interface SpacedRepetitionService {

    void updateRetentionMetric(Long userId,
                               Long cardId,
                               Integer quality);

    List<RetentionMetric> getDueReviews(Long userId);

}
