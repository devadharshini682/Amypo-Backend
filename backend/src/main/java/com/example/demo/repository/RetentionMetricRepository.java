package com.example.demo.repository;
import com.example.demo.entity.RetentionMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RetentionMetricRepository extends JpaRepository<RetentionMetric, Long> {

}