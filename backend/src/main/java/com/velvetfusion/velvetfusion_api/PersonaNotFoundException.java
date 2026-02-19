package com.velvetfusion.velvetfusion_api;

public class PersonaNotFoundException extends RuntimeException {
    public PersonaNotFoundException(String name) {
        super("Persona not found: " + name);
    }
}
