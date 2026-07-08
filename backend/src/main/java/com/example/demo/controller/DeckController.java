// package com.example.demo.controller;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import com.example.demo.entity.StudyDeck;
// import com.example.demo.service.DeckManagementService;

// @RestController
// @RequestMapping("/api/decks")
// public class DeckController {

//     @Autowired
//     private DeckManagementService deckService;

//     @GetMapping
//     public List<StudyDeck> getAllDecks() {
//         return deckService.getAllDecks();
//     }

//     @GetMapping("/{id}")
//     public StudyDeck getDeck(@PathVariable Long id) {
//         return deckService.getDeckById(id);
//     }

//     @PostMapping
//     public StudyDeck createDeck(@RequestBody StudyDeck deck) {
//         return deckService.createDeck(deck);
//     }

//     @PutMapping("/{id}")
//     public StudyDeck updateDeck(@PathVariable Long id,
//                                 @RequestBody StudyDeck deck) {
//         return deckService.updateDeck(id, deck);
//     }

//     @DeleteMapping("/{id}")
//     public String deleteDeck(@PathVariable Long id) {
//         deckService.deleteDeck(id);
//         return "StudyDeck deleted successfully.";
//     }
// }
package com.example.demo.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.StudyDeck;
import com.example.demo.service.DeckManagementService;

@RestController
@RequestMapping("/api/decks")
@CrossOrigin(origins = "*")
public class DeckController {

    @Autowired
    private DeckManagementService deckService;

    @GetMapping
    public List<StudyDeck> getAllDecks() {
        return deckService.getAllDecks();
    }

    @GetMapping("/{id}")
    public StudyDeck getDeck(@PathVariable Long id) {
        return deckService.getDeckById(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
    public StudyDeck createDeck(@Valid @RequestBody StudyDeck deck) {
        return deckService.createDeck(deck);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
    public StudyDeck updateDeck(@PathVariable Long id,
                                @Valid @RequestBody StudyDeck deck) {
        return deckService.updateDeck(id, deck);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteDeck(@PathVariable Long id) {
        deckService.deleteDeck(id);
        return "StudyDeck deleted successfully.";
    }
}