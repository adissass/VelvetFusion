package com.velvetfusion.velvetfusion_api.controller;

import com.velvetfusion.velvetfusion_api.service.FusionCalculatorService;
import com.velvetfusion.velvetfusion_api.PersonaNotFoundException;
import com.velvetfusion.velvetfusion_api.dto.FuseRequestDto;
import com.velvetfusion.velvetfusion_api.dto.PersonaResponseDto;
import com.velvetfusion.velvetfusion_api.mapper.PersonaMapper;
import com.velvetfusion.velvetfusion_api.model.Persona;
import com.velvetfusion.velvetfusion_api.repository.PersonaRepository;
import jakarta.validation.Valid;
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
    public List<PersonaResponseDto> getAllPersonas() {
        return PersonaMapper.toResponseDtoList(personaRepository.findAll());
    }

    @GetMapping("/fuse")
    public ResponseEntity<PersonaResponseDto> fuse(@Valid @ModelAttribute FuseRequestDto request) throws PersonaNotFoundException {
        Persona fusion = fusionCalculator.fuse(request.getName1(), request.getName2());
        return ResponseEntity.ok(PersonaMapper.toResponseDto(fusion));
    }

    @GetMapping("/{name}")
    public PersonaResponseDto getPersona(@PathVariable String name) {
        Persona persona = personaRepository.findByName(name)
                .orElseThrow(() -> new PersonaNotFoundException(name));
        return PersonaMapper.toResponseDto(persona);
    }
}
