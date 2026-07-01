package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.StudySession;

public interface StudySessionService {

    StudySession completeSession(StudySession session);

    List<StudySession> getUserSessions(Long userId);

}