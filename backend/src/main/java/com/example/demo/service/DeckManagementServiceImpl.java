package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.StudyDeck;
import com.example.demo.repository.StudyDeckRepository;

@Service
public class DeckManagementServiceImpl implements DeckManagementService {

    @Autowired
    private StudyDeckRepository studyDeckRepository;

    @Override
    public List<StudyDeck> getAllDecks() {
        return studyDeckRepository.findAll();
    }

    @Override
    public StudyDeck getDeckById(Long id) {
        return studyDeckRepository.findById(id).orElse(null);
    }

    @Override
    public StudyDeck createDeck(StudyDeck deck) {
        return studyDeckRepository.save(deck);
    }

    @Override
    public StudyDeck updateDeck(Long id, StudyDeck deck) {

        StudyDeck existing = studyDeckRepository.findById(id).orElse(null);

        if (existing != null) {
            existing.setTitle(deck.getTitle());
            existing.setDescription(deck.getDescription());
            existing.setCapacity(deck.getCapacity());
            existing.setMentorName(deck.getMentorName());
            existing.setOwnerId(deck.getOwnerId());

            return studyDeckRepository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteDeck(Long id) {
        studyDeckRepository.deleteById(id);
    }
}