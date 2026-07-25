// package com.example.demo.entity;

// import jakarta.persistence.*;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.NotNull;

// @Entity
// @Table(name = "flashcard")
// public class Flashcard {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(nullable = false)
//     @NotBlank
//     private String frontContent;

//     @Column(nullable = false)
//     @NotBlank
//     private String backContent;

//     @Column(nullable = false)
//     @NotNull
//     private Integer orderIndex;

//     @ManyToOne
//     @JoinColumn(name = "deck_id", nullable = false)
//     private StudyDeck studyDeck;

//     public Flashcard() {
//     }

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public String getFrontContent() {
//         return frontContent;
//     }

//     public void setFrontContent(String frontContent) {
//         this.frontContent = frontContent;
//     }

//     public String getBackContent() {
//         return backContent;
//     }

//     public void setBackContent(String backContent) {
//         this.backContent = backContent;
//     }

//     public Integer getOrderIndex() {
//         return orderIndex;
//     }

//     public void setOrderIndex(Integer orderIndex) {
//         this.orderIndex = orderIndex;
//     }

//     public StudyDeck getStudyDeck() {
//         return studyDeck;
//     }

//     public void setStudyDeck(StudyDeck studyDeck) {
//         this.studyDeck = studyDeck;
//     }
// }
package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


@Entity
@Table(name = "flashcard")
public class Flashcard {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    @NotBlank
    private String frontContent;


    @Column(nullable = false)
    @NotBlank
    private String backContent;


    @Column(nullable = false)
    @NotNull
    private Integer orderIndex;



    @ManyToOne
    @JoinColumn(name = "deck_id", nullable = false)
    @JsonIgnore
    private StudyDeck studyDeck;



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


    public StudyDeck getStudyDeck() {
        return studyDeck;
    }


    public void setStudyDeck(StudyDeck studyDeck) {
        this.studyDeck = studyDeck;
    }
}