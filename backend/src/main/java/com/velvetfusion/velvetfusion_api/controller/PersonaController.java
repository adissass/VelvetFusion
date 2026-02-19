package com.velvetfusion.velvetfusion_api.controller;

import com.velvetfusion.velvetfusion_api.service.FusionCalculatorService;
import com.velvetfusion.velvetfusion_api.PersonaNotFoundException;
import com.velvetfusion.velvetfusion_api.dto.FuseRequestDto;
import com.velvetfusion.velvetfusion_api.dto.PageResponseDto;
import com.velvetfusion.velvetfusion_api.dto.PersonaResponseDto;
import com.velvetfusion.velvetfusion_api.mapper.PersonaMapper;
import com.velvetfusion.velvetfusion_api.model.Persona;
import com.velvetfusion.velvetfusion_api.repository.PersonaRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;

@RestController
@RequestMapping(path = "api/v1/persona")
@CrossOrigin(origins = "http://localhost:3000")
@Validated
public class PersonaController {
    private final PersonaRepository personaRepository;
    private final FusionCalculatorService fusionCalculator;

    @Autowired
    public PersonaController(PersonaRepository personaRepository, FusionCalculatorService fusionCalculator) {
        this.personaRepository = personaRepository;
        this.fusionCalculator = fusionCalculator;
    }

    @GetMapping
    public PageResponseDto<PersonaResponseDto> getAllPersonas(
            @RequestParam(defaultValue = "0") @Min(value = 0, message = "page must be >= 0") int page,
            @RequestParam(defaultValue = "50") @Min(value = 1, message = "size must be >= 1") @Max(value = 100, message = "size must be <= 100") int size
    ) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").ascending());
        Page<Persona> personaPage = personaRepository.findAll(pageRequest);
        Page<PersonaResponseDto> dtoPage = personaPage.map(PersonaMapper::toResponseDto);
        return PageResponseDto.fromPage(dtoPage);
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
