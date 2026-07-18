package com.example.demo.service;
import com.example.demo.entity.LanguageTrack;

import java.util.List;

public interface LanguageService {

    List<LanguageTrack> getAllLanguages();

    LanguageTrack getLanguageById(Long id);

}