package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.SystemUser;
import com.example.demo.repository.SystemUserRepository;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private SystemUserRepository systemUserRepository;

    @Override
    public SystemUser register(SystemUser user) {
        return systemUserRepository.save(user);
    }

    @Override
    public String login(String username, String password) {

        SystemUser user = systemUserRepository.findByUsername(username).orElse(null);

        if (user != null && user.getPassword().equals(password)) {
            return "Login Successful";
        }

        return "Invalid Username or Password";
    }
}