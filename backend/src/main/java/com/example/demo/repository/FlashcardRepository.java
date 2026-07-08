// package com.example.demo.repository;

// import com.example.demo.entity.Flashcard;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// @Repository
// public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {

// }
import java.util.List;

import org.springframework.data.jpa.repository.Query;

public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {

    List<Flashcard> findByDeckIdOrderByOrderIndexAsc(Long deckId);

    @Query("SELECT f FROM Flashcard f WHERE f.deck.id = ?1")
    List<Flashcard> getCards(Long deckId);

}