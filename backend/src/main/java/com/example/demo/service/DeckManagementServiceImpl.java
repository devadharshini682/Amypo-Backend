
package com.example.demo.service;


import com.example.demo.dto.DeckRequestDto;
import com.example.demo.entity.StudyDeck;
import com.example.demo.entity.SystemUser;

import com.example.demo.repository.StudyDeckRepository;
import com.example.demo.repository.SystemUserRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;



@Service
public class DeckManagementServiceImpl 
        implements DeckManagementService {



    @Autowired
    private StudyDeckRepository studyDeckRepository;



    @Autowired
    private SystemUserRepository systemUserRepository;





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
    public StudyDeck createDeck(
            DeckRequestDto dto,
            String username) {



        SystemUser user =
                systemUserRepository.findByUsername(username)
                .orElseThrow(
                    () -> new RuntimeException("User not found")
                );



        StudyDeck deck = new StudyDeck();



        deck.setTitle(dto.getTitle());

        deck.setDescription(dto.getDescription());

        deck.setMentorName(dto.getMentorName());

        deck.setCapacity(dto.getCapacity());



        // Assign logged-in user as owner
        deck.setOwner(user);



        return studyDeckRepository.save(deck);
    }








    @Override
    public StudyDeck updateDeck(
            Long id,
            DeckRequestDto dto) {



        StudyDeck deck =
                studyDeckRepository.findById(id)
                .orElse(null);



        if(deck != null) {


            deck.setTitle(dto.getTitle());

            deck.setDescription(dto.getDescription());

            deck.setMentorName(dto.getMentorName());

            deck.setCapacity(dto.getCapacity());



            return studyDeckRepository.save(deck);
        }



        return null;
    }








    @Override
    public void deleteDeck(Long id) {

        studyDeckRepository.deleteById(id);

    }

}
