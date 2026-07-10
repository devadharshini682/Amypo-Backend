package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnalyticsController {

    @GetMapping("/api/analytics")
    public String analytics() {
        return "Analytics Module";
    }

}