
package com.example.demo.service;

import com.example.demo.config.JwtService;
import com.example.demo.dto.AuthRequestDto;
import com.example.demo.dto.AuthResponseDto;
import com.example.demo.dto.RegisterDto;
import com.example.demo.entity.SystemUser;
import com.example.demo.repository.SystemUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {


    @Autowired
    private SystemUserRepository systemUserRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private JwtService jwtService;



    // REGISTER USER
    public AuthResponseDto register(RegisterDto dto) {


        if (systemUserRepository.existsByUsername(dto.getUsername())) {

            throw new IllegalStateException("Username already exists.");

        }


        SystemUser user = new SystemUser();


        user.setUsername(dto.getUsername());

        user.setEmail(dto.getEmail());

        user.setPassword(
                passwordEncoder.encode(dto.getPassword())
        );


        user.setRole(
                SystemUser.Role.valueOf(
                        dto.getRole().toUpperCase()
                )
        );


        systemUserRepository.save(user);



        // JWT token with role
        String token = jwtService.generateToken(
                user.getUsername(),
                user.getRole().name()
        );


        return new AuthResponseDto(
                token,
                user.getUsername(),
                user.getRole().name()
        );
    }




    // LOGIN USER
    public AuthResponseDto login(AuthRequestDto dto) {


        SystemUser user =
                systemUserRepository.findByUsername(dto.getUsername())
                        .orElseThrow(
                                () -> new IllegalStateException(
                                        "Invalid username or password."
                                )
                        );



        if (!passwordEncoder.matches(
                dto.getPassword(),
                user.getPassword()
        )) {

            throw new IllegalStateException(
                    "Invalid username or password."
            );
        }



        // JWT token with role
        String token = jwtService.generateToken(
                user.getUsername(),
                user.getRole().name()
        );



        return new AuthResponseDto(
                token,
                user.getUsername(),
                user.getRole().name()
        );
    }

}