// 
package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class DeckRequestDto {

    @NotBlank(message = "Title is required")
    @Size(max = 100)
    private String title;

    @NotBlank(message = "Language is required")
    private String language;

    private String description;

    @NotBlank(message = "Mentor name is required")
    private String mentorName;


    public DeckRequestDto() {
    }


    public DeckRequestDto(String title, String language, String description, String mentorName) {
        this.title = title;
        this.language = language;
        this.description = description;
        this.mentorName = mentorName;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public String getMentorName() {
        return mentorName;
    }

    public void setMentorName(String mentorName) {
        this.mentorName = mentorName;
    }
}