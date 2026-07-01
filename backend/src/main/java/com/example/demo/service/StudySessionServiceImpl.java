package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.StudySession;
import com.example.demo.repository.StudySessionRepository;

@Service
public class StudySessionServiceImpl implements StudySessionService {

    @Autowired
    private StudySessionRepository studySessionRepository;

    @Override
    public StudySession completeSession(StudySession session) {
        return studySessionRepository.save(session);
    }

    @Override
    public List<StudySession> getUserSessions(Long userId) {
        return studySessionRepository.findAll();
    }
}