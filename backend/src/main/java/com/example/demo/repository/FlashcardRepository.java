package com.example.demo.repository;



import com.example.demo.entity.Flashcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {

    List<Flashcard> findByStudyDeckIdOrderByOrderIndexAsc(Long deckId);

}