
// package com.example.demo.service;


// import com.example.demo.dto.DeckRequestDto;
// import com.example.demo.entity.StudyDeck;
// import com.example.demo.entity.SystemUser;

// import com.example.demo.repository.StudyDeckRepository;
// import com.example.demo.repository.SystemUserRepository;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;


// import java.util.List;



// @Service
// public class DeckManagementServiceImpl 
//         implements DeckManagementService {



//     @Autowired
//     private StudyDeckRepository studyDeckRepository;



//     @Autowired
//     private SystemUserRepository systemUserRepository;





//     @Override
//     public List<StudyDeck> getAllDecks() {

//         return studyDeckRepository.findAll();
//     }






//     @Override
//     public StudyDeck getDeckById(Long id) {

//         return studyDeckRepository.findById(id)
//                 .orElse(null);
//     }







//     @Override
//     public StudyDeck createDeck(
//             DeckRequestDto dto,
//             String username) {



//         SystemUser user =
//                 systemUserRepository.findByUsername(username)
//                 .orElseThrow(
//                     () -> new RuntimeException("User not found")
//                 );



//         StudyDeck deck = new StudyDeck();



//         deck.setTitle(dto.getTitle());

//         deck.setDescription(dto.getDescription());

//         deck.setMentorName(dto.getMentorName());

//         deck.setCapacity(dto.getCapacity());



//         // Assign logged-in user as owner
//         deck.setOwner(user);



//         return studyDeckRepository.save(deck);
//     }








//     @Override
//     public StudyDeck updateDeck(
//             Long id,
//             DeckRequestDto dto) {



//         StudyDeck deck =
//                 studyDeckRepository.findById(id)
//                 .orElse(null);



//         if(deck != null) {


//             deck.setTitle(dto.getTitle());

//             deck.setDescription(dto.getDescription());

//             deck.setMentorName(dto.getMentorName());

//             deck.setCapacity(dto.getCapacity());



//             return studyDeckRepository.save(deck);
//         }



//         return null;
//     }








//     @Override
//     public void deleteDeck(Long id) {

//         studyDeckRepository.deleteById(id);

//     }

// }
// package com.example.demo.service;

// import com.example.demo.dto.DeckRequestDto;

// import com.example.demo.entity.Flashcard;
// import com.example.demo.entity.StudyDeck;
// import com.example.demo.entity.SystemUser;

// import com.example.demo.repository.FlashcardRepository;
// import com.example.demo.repository.StudyDeckRepository;
// import com.example.demo.repository.SystemUserRepository;

// import org.springframework.beans.factory.annotation.Autowired;

// import org.springframework.stereotype.Service;

// import org.springframework.transaction.annotation.Transactional;

// import java.util.List;


// @Service
// public class DeckManagementServiceImpl
//         implements DeckManagementService {


//     @Autowired
//     private StudyDeckRepository studyDeckRepository;


//     @Autowired
//     private SystemUserRepository systemUserRepository;


//     @Autowired
//     private FlashcardRepository flashcardRepository;


//     // --------------------------------
//     // GET ALL
//     // --------------------------------

//     @Override
//     public List<StudyDeck> getAllDecks() {

//         return studyDeckRepository.findAll();

//     }


//     // --------------------------------
//     // GET BY ID
//     // --------------------------------

//     @Override
//     public StudyDeck getDeckById(
//             Long id) {

//         return studyDeckRepository
//             .findById(id)
//             .orElse(null);

//     }


//     // --------------------------------
//     // CREATE
//     // --------------------------------

//     @Override
//     public StudyDeck createDeck(
//             DeckRequestDto dto,
//             String username) {


//         SystemUser user =
//             systemUserRepository
//                 .findByUsername(username)
//                 .orElseThrow(
//                     () -> new RuntimeException(
//                         "User not found"
//                     )
//                 );


//         StudyDeck deck =
//             new StudyDeck();


//         deck.setTitle(
//             dto.getTitle()
//         );


//         deck.setDescription(
//             dto.getDescription()
//         );


//         deck.setMentorName(
//             dto.getMentorName()
//         );


//         deck.setCapacity(
//             dto.getCapacity()
//         );


//         deck.setOwner(
//             user
//         );


//         return studyDeckRepository.save(
//             deck
//         );
//     }


//     // --------------------------------
//     // UPDATE
//     // --------------------------------

//     @Override
//     public StudyDeck updateDeck(
//             Long id,
//             DeckRequestDto dto) {


//         StudyDeck deck =
//             studyDeckRepository
//                 .findById(id)
//                 .orElse(null);


//         if (deck != null) {

//             deck.setTitle(
//                 dto.getTitle()
//             );

//             deck.setDescription(
//                 dto.getDescription()
//             );

//             deck.setMentorName(
//                 dto.getMentorName()
//             );

//             deck.setCapacity(
//                 dto.getCapacity()
//             );


//             return studyDeckRepository.save(
//                 deck
//             );
//         }


//         return null;
//     }


//     // --------------------------------
//     // DELETE
//     // --------------------------------

//     @Override
//     public void deleteDeck(
//             Long id) {

//         studyDeckRepository.deleteById(
//             id
//         );
//     }


//     // --------------------------------
//     // CLONE
//     // --------------------------------

//     @Override
//     @Transactional
//     public StudyDeck cloneDeck(
//             Long id,
//             String username) {


//         // Find original deck
//         StudyDeck source =
//             studyDeckRepository
//                 .findById(id)
//                 .orElseThrow(
//                     () -> new RuntimeException(
//                         "Deck not found"
//                     )
//                 );


//         // Find current logged-in user
//         SystemUser owner =
//             systemUserRepository
//                 .findByUsername(username)
//                 .orElseThrow(
//                     () -> new RuntimeException(
//                         "User not found"
//                     )
//                 );


//         // Create new deck
//         StudyDeck copy =
//             new StudyDeck();


//         copy.setTitle(
//             source.getTitle() +
//             " (Copy)"
//         );


//         copy.setDescription(
//             source.getDescription()
//         );


//         copy.setMentorName(
//             source.getMentorName()
//         );


//         copy.setCapacity(
//             source.getCapacity()
//         );


//         copy.setOwner(
//             owner
//         );


//         // Save cloned deck first
//         StudyDeck savedCopy =
//             studyDeckRepository.save(
//                 copy
//             );


//         // Copy every flashcard
//         for (
//             Flashcard sourceCard :
//             source.getFlashcards()
//         ) {


//             Flashcard copyCard =
//                 new Flashcard();


//             copyCard.setFrontContent(
//                 sourceCard.getFrontContent()
//             );


//             copyCard.setBackContent(
//                 sourceCard.getBackContent()
//             );


//             copyCard.setOrderIndex(
//                 sourceCard.getOrderIndex()
//             );


//             copyCard.setPronunciation(
//                 sourceCard.getPronunciation()
//             );


//             copyCard.setExampleSentence(
//                 sourceCard.getExampleSentence()
//             );


//             copyCard.setStatus(
//                 sourceCard.getStatus() == null
//                     ? "ACTIVE"
//                     : sourceCard.getStatus()
//             );


//             copyCard.setStudyDeck(
//                 savedCopy
//             );


//             flashcardRepository.save(
//                 copyCard
//             );
//         }


//         return savedCopy;
//     }
// }
package com.example.demo.service;

import com.example.demo.dto.DeckRequestDto;
import com.example.demo.dto.FlashcardRequestDto;
import com.example.demo.entity.Flashcard;
import com.example.demo.entity.LanguageTrack;
import com.example.demo.entity.StudyDeck;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.FlashcardRepository;
import com.example.demo.repository.LanguageTrackRepository;
import com.example.demo.repository.StudyDeckRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class DeckManagementServiceImpl
        implements DeckManagementService {

    private final StudyDeckRepository deckRepository;
    private final FlashcardRepository flashcardRepository;
    private final LanguageTrackRepository languageRepository;

    public DeckManagementServiceImpl(
            StudyDeckRepository deckRepository,
            FlashcardRepository flashcardRepository,
            LanguageTrackRepository languageRepository) {

        this.deckRepository = deckRepository;
        this.flashcardRepository = flashcardRepository;
        this.languageRepository = languageRepository;
    }

    @Override
    public List<StudyDeck> getAllDecks() {
        return deckRepository.findAll();
    }

    @Override
    public StudyDeck getDeckById(Long id) {
        return deckRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Deck not found: " + id
                        ));
    }

    @Override
    public StudyDeck createDeck(DeckRequestDto request) {

        StudyDeck deck = new StudyDeck();

        deck.setTitle(request.getTitle());
        deck.setPublic(request.isPublic());

        if (request.getLanguageId() != null) {
            LanguageTrack language =
                    languageRepository.findById(
                            request.getLanguageId()
                    ).orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Language not found"
                            ));

            deck.setLanguage(language);
        }

        return deckRepository.save(deck);
    }

    @Override
    public StudyDeck updateDeck(
            Long id,
            DeckRequestDto request) {

        StudyDeck deck = getDeckById(id);

        deck.setTitle(request.getTitle());
        deck.setPublic(request.isPublic());

        if (request.getLanguageId() != null) {
            LanguageTrack language =
                    languageRepository.findById(
                            request.getLanguageId()
                    ).orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Language not found"
                            ));

            deck.setLanguage(language);
        }

        return deckRepository.save(deck);
    }

    @Override
    public void deleteDeck(Long id) {
        StudyDeck deck = getDeckById(id);
        deckRepository.delete(deck);
    }

    @Override
    public StudyDeck cloneDeck(Long id) {

        StudyDeck original = getDeckById(id);

        StudyDeck clone = new StudyDeck();

        clone.setTitle(
                original.getTitle() + " (Clone)"
        );

        clone.setPublic(original.isPublic());
        clone.setLanguage(original.getLanguage());

        for (Flashcard originalCard :
                original.getFlashcards()) {

            Flashcard card = new Flashcard();

            card.setFrontText(
                    originalCard.getFrontText()
            );

            card.setBackText(
                    originalCard.getBackText()
            );

            card.setReviewStatus(
                    Flashcard.ReviewStatus.LEARNING
            );

            card.setDeck(clone);

            clone.getFlashcards().add(card);
        }

        return deckRepository.save(clone);
    }

    @Override
    public List<Flashcard> getFlashcardsByDeck(
            Long deckId) {

        return flashcardRepository
                .findByDeckId(deckId);
    }

    @Override
    public Flashcard createFlashcard(
            FlashcardRequestDto request) {

        StudyDeck deck = getDeckById(
                request.getDeckId()
        );

        Flashcard card = new Flashcard();

        card.setFrontText(
                request.getFrontText()
        );

        card.setBackText(
                request.getBackText()
        );

        card.setReviewStatus(
                Flashcard.ReviewStatus.LEARNING
        );

        card.setDeck(deck);

        return flashcardRepository.save(card);
    }

    @Override
    public Flashcard updateFlashcard(
            Long id,
            FlashcardRequestDto request) {

        Flashcard card =
                flashcardRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Flashcard not found"
                                ));

        card.setFrontText(
                request.getFrontText()
        );

        card.setBackText(
                request.getBackText()
        );

        return flashcardRepository.save(card);
    }

    @Override
    public void deleteFlashcard(Long id) {

        Flashcard card =
                flashcardRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Flashcard not found"
                                ));

        flashcardRepository.delete(card);
    }

    @Override
    public Flashcard updateReviewStatus(
            Long id,
            String status) {

        Flashcard card =
                flashcardRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Flashcard not found"
                                ));

        Flashcard.ReviewStatus reviewStatus;

        try {
            reviewStatus =
                    Flashcard.ReviewStatus.valueOf(
                            status.toUpperCase()
                    );
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(
                    "Invalid review status. Use LEARNING or MASTERED."
            );
        }

        card.setReviewStatus(reviewStatus);
        card.setLastReviewedAt(LocalDateTime.now());

        if (reviewStatus ==
                Flashcard.ReviewStatus.MASTERED) {

            card.setNextReviewAt(
                    LocalDateTime.now().plusDays(7)
            );

        } else {

            card.setNextReviewAt(
                    LocalDateTime.now().plusDays(1)
            );
        }

        return flashcardRepository.save(card);
    }
}