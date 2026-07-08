 package com.example.demo.repository;

// import com.example.demo.entity.StudyDeck;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// @Repository
// public interface StudyDeckRepository extends JpaRepository<StudyDeck, Long> {

// }
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.StudyDeck;

public interface StudyDeckRepository extends JpaRepository<StudyDeck, Long>{

    List<StudyDeck> findByTitleContaining(String keyword);

}