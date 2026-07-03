package com.example.demo.exception;

public class ResourceNotFoundException extends RuntimeException { //converting java class into exception class


    //parameterised constructor
    public ResourceNotFoundException(String message) {
        super(message); 
    }
}