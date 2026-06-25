package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "system_user")
public class SystemUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        LEARNER,
        LINGUIST,
        ADMIN
    }

    // constructors, getters, setters
}