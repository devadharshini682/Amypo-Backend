package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "flashcard")
public class Flashcard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String frontContent;

    @Column(nullable = false)
    private String backContent;

    private Integer orderIndex;

    @ManyToOne
    @JoinColumn(name = "deck_id")
    private StudyDeck deck;

    public Flashcard() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFrontContent() {
        return frontContent;
    }

    public void setFrontContent(String frontContent) {
        this.frontContent = frontContent;
    }

    public String getBackContent() {
        return backContent;
    }

    public void setBackContent(String backContent) {
        this.backContent = backContent;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    public StudyDeck getDeck() {
        return deck;
    }

    public void setDeck(StudyDeck deck) {
        this.deck = deck;
    }

}