// package com.example.demo.service;

// import com.example.demo.dto.SessionResultDto;
// import com.example.demo.entity.StudySession;
// import com.example.demo.exception.ResourceNotFoundException;
// import com.example.demo.repository.StudySessionRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.List;

// @Service
// public class StudySessionService {

//     @Autowired
//     private StudySessionRepository studySessionRepository;

//     public StudySession completeSession(SessionResultDto dto) {

//         StudySession session = studySessionRepository.findById(dto.getSessionId())
//                 .orElseThrow(() -> new ResourceNotFoundException(
//                         "Study session not found with id: " + dto.getSessionId()));

//         session.setEndTime(LocalDateTime.now());
//         session.setScore((int) Math.round(dto.getAccuracy()));

//         return studySessionRepository.save(session);
//     }

//     public List<StudySession> getUserSessions(Long userId) {
//         return studySessionRepository.findByUserId(userId);
//     }
// }
package com.example.demo.service;

import com.example.demo.dto.SessionResultDto;
import com.example.demo.entity.StudyDeck;
import com.example.demo.entity.StudySession;
import com.example.demo.repository.StudyDeckRepository;
import com.example.demo.repository.StudySessionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class StudySessionService {

    private final StudySessionRepository studySessionRepository;
    private final StudyDeckRepository studyDeckRepository;

    public StudySessionService(
            StudySessionRepository studySessionRepository,
            StudyDeckRepository studyDeckRepository) {

        this.studySessionRepository =
                studySessionRepository;

        this.studyDeckRepository =
                studyDeckRepository;
    }

    public StudySession startSession(Long deckId) {

        StudyDeck deck =
                studyDeckRepository.findById(deckId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Study deck not found"
                                ));

        StudySession session = new StudySession();

        session.setStudyDeck(deck);
        session.setStartTime(LocalDateTime.now());

        return studySessionRepository.save(session);
    }

    public StudySession completeSession(
            Long sessionId,
            SessionResultDto result) {

        StudySession session =
                studySessionRepository.findById(sessionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Study session not found"
                                ));

        session.setEndTime(LocalDateTime.now());

        session.setScore(
                result.getScore()
        );

        return studySessionRepository.save(session);
    }
}