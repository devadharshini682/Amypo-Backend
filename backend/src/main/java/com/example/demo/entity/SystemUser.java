package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "system_user")
public class SystemUser {

    public enum Role {
        LEARNER,
        LINGUIST,
        ADMIN
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Username cannot be blank")
    private String username;

    @Column(nullable = false)
    @NotBlank(message = "Password cannot be blank")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull(message = "Role is required")
    private Role role;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudyDeck> studyDecks = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudySession> studySessions = new ArrayList<>();

    public SystemUser() {
    }

    public SystemUser(Long id, String username, String password, Role role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Store BCrypt encoded password only.
     */
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<StudyDeck> getStudyDecks() {
        return studyDecks;
    }

    public void setStudyDecks(List<StudyDeck> studyDecks) {
        this.studyDecks = studyDecks;
    }

    public List<StudySession> getStudySessions() {
        return studySessions;
    }

    public void setStudySessions(List<StudySession> studySessions) {
        this.studySessions = studySessions;
    }
}