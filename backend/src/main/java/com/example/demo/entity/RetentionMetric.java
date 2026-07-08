
package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "retention_metric")
public class RetentionMetric {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double easeFactor = 2.5;

    private Integer intervalDays;

    private LocalDateTime nextReviewDate;

    @Enumerated(EnumType.STRING)
    private MasteryLevel masteryLevel;

    public enum MasteryLevel {
        NEW,
        LEARNING,
        MASTERED
    }

    public RetentionMetric() {
    }

    public RetentionMetric(Long id, Double easeFactor,
                           Integer intervalDays,
                           LocalDateTime nextReviewDate,
                           MasteryLevel masteryLevel) {
        this.id = id;
        this.easeFactor = easeFactor;
        this.intervalDays = intervalDays;
        this.nextReviewDate = nextReviewDate;
        this.masteryLevel = masteryLevel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getEaseFactor() {
        return easeFactor;
    }

    public void setEaseFactor(Double easeFactor) {
        this.easeFactor = easeFactor;
    }

    public Integer getIntervalDays() {
        return intervalDays;
    }

    public void setIntervalDays(Integer intervalDays) {
        this.intervalDays = intervalDays;
    }

    public LocalDateTime getNextReviewDate() {
        return nextReviewDate;
    }

    public void setNextReviewDate(LocalDateTime nextReviewDate) {
        this.nextReviewDate = nextReviewDate;
    }

    public MasteryLevel getMasteryLevel() {
        return masteryLevel;
    }

    public void setMasteryLevel(MasteryLevel masteryLevel) {
        this.masteryLevel = masteryLevel;
    }

}