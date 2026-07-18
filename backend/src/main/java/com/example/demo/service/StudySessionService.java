package com.example.demo.service;
import com.example.demo.dto.SessionResultDto;
import com.example.demo.entity.StudySession;

import java.util.List;

public interface StudySessionService {

    StudySession completeSession(SessionResultDto dto);

    List<StudySession> getUserSessions(Long userId);

}