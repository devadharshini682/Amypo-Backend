 package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="flashcard")
 public class Flashcard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String frontContent;
    private String backContent;
    private Integer orderIndex;
    
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
    


 
    
 }