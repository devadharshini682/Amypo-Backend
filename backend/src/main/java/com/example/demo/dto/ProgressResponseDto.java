package com.example.demo.dto;

public class ProgressResponseDto {

    private Integer totalSessions;
    private Integer completedCards;
    private Double averageScore;

    public ProgressResponseDto() {
    }

    public Integer getTotalSessions() {
        return totalSessions;
    }

    public void setTotalSessions(Integer totalSessions) {
        this.totalSessions = totalSessions;
    }

    public Integer getCompletedCards() {
        return completedCards;
    }

    public void setCompletedCards(Integer completedCards) {
        this.completedCards = completedCards;
    }

    public Double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(Double averageScore) {
        this.averageScore = averageScore;
    }
}