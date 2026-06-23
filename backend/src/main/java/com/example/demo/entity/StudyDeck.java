package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "study_decks")
public class StudyDeck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private Integer capacity;

    private String mentorName;

    private Long ownerId;

    public StudyDeck() {
    }

    public StudyDeck(Long id, String title, String description,
                     Integer capacity, String mentorName, Long ownerId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.capacity = capacity;
        this.mentorName = mentorName;
        this.ownerId = ownerId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getMentorName() {
        return mentorName;
    }

    public void setMentorName(String mentorName) {
        this.mentorName = mentorName;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

}