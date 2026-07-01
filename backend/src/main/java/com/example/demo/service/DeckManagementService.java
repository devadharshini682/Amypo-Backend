package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.StudyDeck;

public interface DeckManagementService {

    List<StudyDeck> getAllDecks();

    StudyDeck getDeckById(Long id);

    StudyDeck createDeck(StudyDeck deck);

    StudyDeck updateDeck(Long id, StudyDeck deck);

    void deleteDeck(Long id);

}