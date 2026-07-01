package com.example.demo.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.RetentionMetric;

@Repository
public interface RetentionMetricRepository extends JpaRepository<RetentionMetric, Long> {

    List<RetentionMetric> findByNextReviewDateBefore(LocalDateTime nextReviewDate);

}