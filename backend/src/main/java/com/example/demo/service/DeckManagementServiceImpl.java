// package com.example.demo.service;
// import com.example.demo.dto.DeckRequestDto;
// import com.example.demo.entity.StudyDeck;
// import com.example.demo.repository.StudyDeckRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class DeckManagementServiceImpl implements DeckManagementService {

//     @Autowired
//     private StudyDeckRepository studyDeckRepository;

//     @Override
//     public List<StudyDeck> getAllDecks() {
//         return studyDeckRepository.findAll();
//     }

//     @Override
//     public StudyDeck getDeckById(Long id) {
//         return studyDeckRepository.findById(id).orElse(null);
//     }

//     @Override
//     public StudyDeck createDeck(DeckRequestDto dto) {

//         StudyDeck deck = new StudyDeck();

//         deck.setTitle(dto.getTitle());
//         deck.setDescription(dto.getDescription());

//         return studyDeckRepository.save(deck);
//     }

//     @Override
//     public StudyDeck updateDeck(Long id,
//                                 DeckRequestDto dto) {

//         StudyDeck deck = studyDeckRepository.findById(id).orElse(null);

//         if (deck != null) {

//             deck.setTitle(dto.getTitle());
//             deck.setDescription(dto.getDescription());

//             return studyDeckRepository.save(deck);
//         }

//         return null;
//     }

//     @Override
//     public void deleteDeck(Long id) {

//         studyDeckRepository.deleteById(id);

//     }

// }
package com.example.demo.service;

import com.example.demo.dto.DeckRequestDto;
import com.example.demo.entity.StudyDeck;
import com.example.demo.repository.StudyDeckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return studyDeckRepository.findById(id)
                .orElse(null);
    }


    @Override
    public StudyDeck createDeck(DeckRequestDto dto) {

        StudyDeck deck = new StudyDeck();

        deck.setTitle(dto.getTitle());
        deck.setDescription(dto.getDescription());
        deck.setMentorName(dto.getMentorName());

        return studyDeckRepository.save(deck);
    }


    @Override
    public StudyDeck updateDeck(Long id, DeckRequestDto dto) {

        StudyDeck deck = studyDeckRepository.findById(id)
                .orElse(null);

        if (deck != null) {

            deck.setTitle(dto.getTitle());
            deck.setDescription(dto.getDescription());
            deck.setMentorName(dto.getMentorName());

            return studyDeckRepository.save(deck);
        }

        return null;
    }


    @Override
    public void deleteDeck(Long id) {

        studyDeckRepository.deleteById(id);

    }
}
