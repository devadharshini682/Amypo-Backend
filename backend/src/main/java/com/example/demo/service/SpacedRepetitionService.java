// package com.example.demo.service;

// import com.example.demo.entity.RetentionMetric;
// import com.example.demo.repository.RetentionMetricRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.List;
// import java.util.stream.Collectors;

// @Service
// public class SpacedRepetitionService {

//     @Autowired
//     private RetentionMetricRepository retentionMetricRepository;

//     public void updateRetentionMetric(Long userId, Long cardId, Integer quality) {

//         // NOTE: RetentionMetric currently has no user/flashcard relation,
//         // so a specific learner's specific card metric cannot be looked up.
//         // Implemented as a no-op placeholder until the entity supports it.

//     }

//     public List<RetentionMetric> getDueReviews(Long userId) {

//         // NOTE: filtering ignores userId since RetentionMetric has no user field yet.
//         // Returns all metrics currently due for review.
//         LocalDateTime now = LocalDateTime.now();

//         return retentionMetricRepository.findAll().stream()
//                 .filter(metric -> metric.getNextReviewDate() != null
//                         && !metric.getNextReviewDate().isAfter(now))
//                 .collect(Collectors.toList());
//     }
// }
// package com.example.demo.service;

// import com.example.demo.entity.RetentionMetric;
// import com.example.demo.repository.RetentionMetricRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.List;

// @Service
// public class SpacedRepetitionService {

//     @Autowired
//     private RetentionMetricRepository retentionMetricRepository;

//     public void updateRetentionMetric(
//             Long userId,
//             Long cardId,
//             Integer quality) {

//         // Existing method preserved.
//     }

//     public List<RetentionMetric> getDueReviews(Long userId) {

//         return retentionMetricRepository.findDueReviews(
//                 userId,
//                 LocalDateTime.now()
//         );
//     }
// }
package com.example.demo.service;

import com.example.demo.entity.Flashcard;
import com.example.demo.entity.RetentionMetric;
import com.example.demo.repository.FlashcardRepository;
import com.example.demo.repository.RetentionMetricRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class SpacedRepetitionService {

    private final FlashcardRepository flashcardRepository;
    private final RetentionMetricRepository retentionMetricRepository;

    public SpacedRepetitionService(
            FlashcardRepository flashcardRepository,
            RetentionMetricRepository retentionMetricRepository) {

        this.flashcardRepository = flashcardRepository;
        this.retentionMetricRepository =
                retentionMetricRepository;
    }

    public Flashcard recordReview(
            Long flashcardId,
            Long userId,
            boolean correct) {

        Flashcard card =
                flashcardRepository.findById(flashcardId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Flashcard not found"
                                ));

        LocalDateTime now = LocalDateTime.now();

        card.setLastReviewedAt(now);

        if (correct) {

            card.setReviewStatus(
                    Flashcard.ReviewStatus.MASTERED
            );

            card.setNextReviewAt(
                    now.plusDays(7)
            );

        } else {

            card.setReviewStatus(
                    Flashcard.ReviewStatus.LEARNING
            );

            card.setNextReviewAt(
                    now.plusDays(1)
            );
        }

        flashcardRepository.save(card);

        RetentionMetric metric = new RetentionMetric();

        metric.setUserId(userId);
        metric.setFlashcardId(flashcardId);
        metric.setCorrect(correct);
        metric.setReviewedAt(now);

        retentionMetricRepository.save(metric);

        return card;
    }

    public List<RetentionMetric> getRetentionMetrics(
            Long userId) {

        return retentionMetricRepository
                .findByUserId(userId);
    }
}