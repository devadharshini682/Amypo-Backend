package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "language_track")
public class LanguageTrack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public LanguageTrack() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}