package com.velvetfusion.velvetfusion_api.controller;

import com.velvetfusion.velvetfusion_api.service.FusionCalculatorService;
import com.velvetfusion.velvetfusion_api.PersonaNotFoundException;
import com.velvetfusion.velvetfusion_api.model.Persona;
import com.velvetfusion.velvetfusion_api.repository.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/persona")
@CrossOrigin(origins = "http://localhost:3000")
public class PersonaController {
    private final PersonaRepository personaRepository;
    private final FusionCalculatorService fusionCalculator;

    @Autowired
    public PersonaController(PersonaRepository personaRepository, FusionCalculatorService fusionCalculator) {
        this.personaRepository = personaRepository;
        this.fusionCalculator = fusionCalculator;
    }

    @GetMapping
    public List<Persona> getAllPersonas() {
        return personaRepository.findAll();
    }

    @GetMapping("/fuse")
    public ResponseEntity<Persona> fuse(@RequestParam String name1, @RequestParam String name2) throws PersonaNotFoundException {
        Persona fusion = fusionCalculator.fuse(name1, name2);
        return ResponseEntity.ok(fusion);
    }

    @GetMapping("/{name}")
    public Persona getPersona(@PathVariable String name) {
        return personaRepository.findByName(name)
                .orElseThrow(() -> new PersonaNotFoundException(name));
    }
}
