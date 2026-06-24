package com.example.demo.repository;

import com.example.demo.entity.StudyDeck;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyDeckRepository extends JpaRepository<StudyDeck, Long> {

}