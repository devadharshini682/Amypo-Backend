// package com.example.demo.controller;
// import com.example.demo.dto.DeckRequestDto;
// import com.example.demo.entity.StudyDeck;
// import com.example.demo.service.DeckManagementService;
// import jakarta.validation.Valid;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/decks")
// @CrossOrigin(origins = "*")
// public class DeckController {

//     @Autowired
//     private DeckManagementService deckManagementService;

//     @GetMapping
//     public ResponseEntity<List<StudyDeck>> getAllDecks() {
//         return ResponseEntity.ok(deckManagementService.getAllDecks());
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<StudyDeck> getDeckById(@PathVariable Long id) {
//         return ResponseEntity.ok(deckManagementService.getDeckById(id));
//     }

//     @PostMapping
//     @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
//     public ResponseEntity<String> createDeck(@Valid @RequestBody DeckRequestDto dto) {

//         deckManagementService.createDeck(dto);

//         return new ResponseEntity<>("StudyDeck created successfully.",
//                 HttpStatus.CREATED);
//     }

//     @PutMapping("/{id}")
//     @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
//     public ResponseEntity<StudyDeck> updateDeck(@PathVariable Long id,
//                                                 @Valid @RequestBody DeckRequestDto dto) {

//         return ResponseEntity.ok(
//                 deckManagementService.updateDeck(id, dto)
//         );
//     }

//     @DeleteMapping("/{id}")
//     @PreAuthorize("hasRole('ADMIN')")
//     public ResponseEntity<String> deleteDeck(@PathVariable Long id) {

//         deckManagementService.deleteDeck(id);

//         return ResponseEntity.ok("StudyDeck deleted successfully.");
//     }
// }
package com.example.demo.controller;

import com.example.demo.dto.DeckRequestDto;
import com.example.demo.entity.StudyDeck;
import com.example.demo.service.DeckManagementService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("/api/decks")
@CrossOrigin(origins = "*")
public class DeckController {


    @Autowired
    private DeckManagementService deckManagementService;



    @GetMapping
    public ResponseEntity<List<StudyDeck>> getAllDecks() {

        return ResponseEntity.ok(
                deckManagementService.getAllDecks()
        );
    }



    @GetMapping("/{id}")
    public ResponseEntity<StudyDeck> getDeckById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                deckManagementService.getDeckById(id)
        );
    }



    @PostMapping
    @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
    public ResponseEntity<String> createDeck(
            @Valid @RequestBody DeckRequestDto dto,
            Principal principal) {


        deckManagementService.createDeck(
                dto,
                principal.getName()
        );


        return new ResponseEntity<>(
                "StudyDeck created successfully.",
                HttpStatus.CREATED
        );
    }




    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
    public ResponseEntity<StudyDeck> updateDeck(
            @PathVariable Long id,
            @Valid @RequestBody DeckRequestDto dto) {


        return ResponseEntity.ok(
                deckManagementService.updateDeck(id, dto)
        );
    }




    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteDeck(
            @PathVariable Long id) {


        deckManagementService.deleteDeck(id);


        return ResponseEntity.ok(
                "StudyDeck deleted successfully."
        );
    }

}