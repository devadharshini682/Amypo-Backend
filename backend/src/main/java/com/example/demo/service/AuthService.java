package com.example.demo.service;

import com.example.demo.entity.SystemUser;

public interface AuthService {

    SystemUser register(SystemUser user);

    String login(String username, String password);

}