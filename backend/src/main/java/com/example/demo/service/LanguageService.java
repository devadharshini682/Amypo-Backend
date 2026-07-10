package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public class LanguageService {

    public String getLanguageStatus() {
        return "Language service is active";
    }

}